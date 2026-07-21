import { z } from 'zod';

// --- ZOD SCHEMAS (validation + type inference) ---
// Utilisés pour les inputs utilisateur et les données de formulaires

export const LoginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.email('Invalid email address'),
});
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

const passwordRules = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    password: passwordRules,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export const InviteUserSchema = z.object({
  email: z.email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  role: z.enum(['SUPER_ADMIN', 'COACH']),
});
export type InviteUserInput = z.infer<typeof InviteUserSchema>;

export const ContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.email('Enter a valid email address.'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required.'),
  message: z.string().min(1, 'Message is required.'),
  consent: z.literal(true, { error: 'Please accept the data processing consent.' }),
});
export type ContactFormData = z.infer<typeof ContactSchema>;

// --- PLAIN TYPES ---

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  role: string;
};

export type Media = {
  id: number;
  filename: string;
  url: string;
  mime_type: string;
  size_bytes: number;
  alt: string | null;
  uploaded_at: string;
};

export type ContentItem = {
  id: number;
  keyName: string;
  value: string;
  type: 'TEXT' | 'RICHTEXT' | 'IMAGE_URL' | 'NUMBER';
  page: string;
  label: string;
};

// A lessons row as returned by GET /api/lessons(/public) — 2 single lessons (Group - Adults/Kids)
// + 4 package rows (3-Pack/5-Pack x Adults/Kids). isPackage/sessionsCount/baseLessonId are only
// meaningful on package rows: baseLessonId points at the single lesson whose time_slots the
// package books against (packages never get their own slots).
export type Lesson = {
  id: number;
  title: string;
  type: 'ADULTS' | 'KIDS';
  durationMinutes: number;
  maxParticipants: number;
  price: number;
  depositAmount: number;
  level: 'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  isPackage: boolean;
  sessionsCount: number;
  baseLessonId: number | null;
};

// A time_slots row (joined with its lesson) as returned by GET /api/slots(/public)
export type TimeSlot = {
  id: number;
  lessonId: number;
  title: string;
  type: 'ADULTS' | 'KIDS';
  date: string;
  time: string;
  durationMinutes: number;
  maxParticipants: number;
  price: number;
  depositAmount: number;
  level: 'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  isCancelled: boolean;
  cancelReason: string | null;
  cancelledAt: string | null;
  notes: string | null;
  spotsLeft: number;
};

// A bookings row as returned by GET /api/bookings(/:id) or the token-gated preview endpoints
export type Booking = {
  id: number;
  slotId: number;
  lessonId: number;
  lessonTitle: string;
  lessonType: 'ADULTS' | 'KIDS';
  isPackage: boolean;
  parentBookingId: number | null;
  clientFirstname: string;
  clientLastname: string;
  clientEmail: string;
  clientPhone: string | null;
  participants: number;
  totalPriceAtBooking: number | null;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  cancelledBy: 'CLIENT' | 'COACH' | null;
  cancelReason: string | null;
  cancelledAt: string | null;
  sessionsRequired: number;
  notes: string | null;
  slotDate: string;
  slotTime: string;
  createdAt: string;
  sessions?: Booking[];
  // Only present in the whole-package preview response (GET /bookings/cancel/package/preview) —
  // lets the client reschedule one specific session, since reaching that response already
  // required proving ownership via the group_cancel_token.
  cancelToken?: string;
};

export type CarouselSlide = {
  title: string;
  content: string;
  bulletPoints: { text: string }[];
  imageSrc: string;
  imageAlt: string;
  buttonText?: string;
  buttonHref?: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqCategory = {
  title: string;
  items: FaqItem[];
};

// --- QUIZ / FORMS ---

export type FormOption = {
  id: number;
  label: string;
  value: string;
  feedback: string | null;
  imageUrl: string | null;
  position: number;
};

export type FormField = {
  id: number;
  label: string;
  subtitle: string | null;
  explanation: string | null;
  type: 'SINGLE' | 'MULTIPLE' | 'RANK' | 'TEXT';
  displayType: 'CARDS' | 'SLIDER' | 'CHECKBOX' | 'RADIO' | null;
  imageUrl: string | null;
  isRequired: boolean;
  position: number;
  options?: FormOption[];
};

export type Form = {
  id: number;
  name: string;
  type: 'CONTACT' | 'SURF_TRIP_REQUEST';
  fields: FormField[];
};

export type Submission = {
  id: number;
  formId: number;
  formName: string;
  clientFirstname: string;
  clientLastname: string;
  clientEmail: string;
  clientPhone: string | null;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  createdAt: string;
};
