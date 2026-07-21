// All Zod validation schemas used by validate() in schema.validator.js.
// Each schema mirrors the shape of the corresponding API request body.
import { z } from 'zod';

// invite user (SUPER_ADMIN only)

export const inviteUserSchema = z.object({
  email: z.email('Invalid email address'),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: z.enum(['SUPER_ADMIN', 'COACH']).default('COACH'),
});

// login

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

// reset password request

export const resetPasswordRequestSchema = z.object({
  email: z.email('Invalid email address'),
});

// reset password

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
  })

// update media

export const updateMediaSchema = z.object({
  alt: z.string().max(500).optional(),
});

// update site content

export const updateSiteContentSchema = z.object({
  value: z.string().optional(),
  page: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['TEXT', 'RICHTEXT', 'IMAGE_URL', 'NUMBER']),
});

// lessons (fixed 2-row catalog: Group - Adults / Group - Kids — no create/delete, title never changes)

export const updateLessonSchema = z.object({
  durationMinutes: z.number().int().positive().optional(),
  maxParticipants: z.number().int().positive().optional(),
  price: z.number().min(0).optional(),
  depositAmount: z.number().min(0).optional(),
  level: z.enum(['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
});

// time_slots (dated bookable instances of a lesson — lessonId FK, no duplicated price/duration)

export const createSlotSchema = z.object({
  lessonId: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  time: z.string().min(1).max(10),
  durationMinutes: z.number().int().positive(),
  maxParticipants: z.number().int().positive(),
  price: z.number().min(0),
  depositAmount: z.number().min(0),
  notes: z.string().max(2000).nullable().optional(),
});

export const updateSlotSchema = createSlotSchema.omit({ lessonId: true }).partial();

export const cancelSlotSchema = z.object({
  cancelReason: z.string().min(1).max(500),
});


// bookings (client reservations of a time_slot — single via lessonId+slotId, package via
// lessonId+slotIds; lessonId is the purchased catalog product, single OR package row)

const clientFieldsSchema = {
  clientFirstname: z.string().min(1).max(255),
  clientLastname: z.string().min(1).max(255),
  clientEmail: z.email('Invalid email address'),
  clientPhone: z.string().max(50).optional(),
};

export const createBookingSchema = z.object({
  lessonId: z.number().int().positive(),
  slotId: z.number().int().positive(),
  ...clientFieldsSchema,
  notes: z.string().max(2000).optional(),
});

export const createMultipleBookingSchema = z.object({
  lessonId: z.number().int().positive(),
  slotIds: z.array(z.number().int().positive()).min(2),
  ...clientFieldsSchema,
});

export const tokenActionSchema = z.object({
  token: z.string().min(1),
});

export const rescheduleTokenSchema = z.object({
  token: z.string().min(1),
  newSlotId: z.number().int().positive(),
});

export const adminRescheduleSchema = z.object({
  newSlotId: z.number().int().positive(),
});

export const adminCancelSchema = z.object({
  reason: z.string().max(500).optional(),
});

// contact form

export const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.email(),
  phone: z.string().regex(/^[+\d\s()./-]{1,30}$/, 'Invalid phone number').optional(),
  subject: z.string().min(1).max(255),
  message: z.string().min(1),
  source: z.string().max(100).optional(),
});

// forms (quiz)

export const createFormSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(['CONTACT', 'SURF_TRIP_REQUEST']),
  isActive: z.boolean().default(true),
});

export const updateFormSchema = createFormSchema.partial();

export const createFieldSchema = z.object({
  label: z.string().min(1).max(255),
  subtitle: z.string().max(255).nullable().optional(),
  explanation: z.string().nullable().optional(),
  type: z.enum(['SINGLE', 'MULTIPLE', 'RANK', 'TEXT']),
  displayType: z.enum(['CARDS', 'SLIDER', 'CHECKBOX', 'RADIO']).nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  position: z.number().int().min(0).default(0),
  isRequired: z.boolean().default(true),
});

export const updateFieldSchema = z.object({
  label: z.string().min(1).max(255).optional(),
  subtitle: z.string().max(255).nullable().optional(),
  explanation: z.string().nullable().optional(),
  type: z.enum(['SINGLE', 'MULTIPLE', 'RANK', 'TEXT']).optional(),
  displayType: z.enum(['CARDS', 'SLIDER', 'CHECKBOX', 'RADIO']).nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  position: z.number().int().min(0).optional(),
  isRequired: z.boolean().optional(),
});

export const createOptionSchema = z.object({
  label: z.string().min(1).max(500),
  value: z.string().min(1).max(500),
  feedback: z.string().max(500).nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  position: z.number().int().min(0).default(0),
});

export const updateOptionSchema = createOptionSchema.partial();

// submissions (quiz answers)

const answerSchema = z.object({
  fieldId: z.number().int().positive(),
  value: z.string().max(5000),
});

export const createSubmissionSchema = z.object({
  formId: z.number().int().positive(),
  client: z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.email(),
    phone: z.string().max(100).optional(),
  }),
  answers: z.array(answerSchema).min(1, 'At least one answer is required'),
});

export const updateSubmissionStatusSchema = z.object({
  status: z.enum(['NEW', 'READ', 'REPLIED', 'ARCHIVED']),
});


