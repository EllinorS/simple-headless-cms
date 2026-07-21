// DTO mappers: convert DB rows (snake_case) into the camelCase shape the API exposes.

export const toUserDTO = (u) => ({
  id: u.id,
  email: u.email,
  firstName: u.first_name,
  lastName: u.last_name,
  role: u.role,
  lastLogin: u.last_login,
});

// A lessons row (2 single lessons + 4 package rows) → camelCase.
// price/depositAmount are coerced to Number — mysql2 returns DECIMAL columns as strings (e.g. "60.00").
export const toLessonDTO = (l) => ({
  id: l.id,
  title: l.title,
  type: l.type,
  durationMinutes: l.duration_minutes,
  maxParticipants: l.max_participants,
  price: Number(l.price),
  depositAmount: Number(l.deposit_amount),
  level: l.level,
  isPackage: !!l.is_package,
  sessionsCount: l.sessions_count,
  baseLessonId: l.base_lesson_id,
});

// A time_slots row → camelCase. price/duration/max/deposit live on the slot itself (pre-filled
// from the lesson's catalog defaults at creation, editable per slot after); only `title`/`level`
// are joined from the lesson (not asked to vary per date). price/depositAmount coerced to
// Number — mysql2 returns DECIMAL columns as strings (e.g. "60.00").
export const toSlotDTO = (s) => ({
  id: s.id,
  lessonId: s.lesson_id,
  title: s.title,
  type: s.type,
  date: s.date,
  time: s.time,
  durationMinutes: s.duration_minutes,
  maxParticipants: s.max_participants,
  price: Number(s.price),
  depositAmount: Number(s.deposit_amount),
  level: s.level,
  isCancelled: !!s.is_cancelled,
  cancelReason: s.cancel_reason,
  cancelledAt: s.cancelled_at,
  notes: s.notes,
  spotsLeft: s.spots_left !== undefined ? Number(s.spots_left) : undefined,
});

// A bookings row (joined with time_slots + lessons) → camelCase, for the admin bookings list
// and client-facing booking previews. Never exposes cancel_token/group_cancel_token/balance_token
// — those are the secret the client already holds via the URL, not something to echo back broadly.
export const toBookingDTO = (b) => ({
  id: b.id,
  slotId: b.slot_id,
  lessonId: b.lesson_id,
  lessonTitle: b.lesson_title,
  lessonType: b.lesson_type,
  isPackage: !!b.is_package,
  parentBookingId: b.parent_booking_id,
  clientFirstname: b.client_firstname,
  clientLastname: b.client_lastname,
  clientEmail: b.client_email,
  clientPhone: b.client_phone,
  participants: b.participants,
  totalPriceAtBooking: b.total_price_at_booking !== null ? Number(b.total_price_at_booking) : null,
  status: b.status,
  cancelledBy: b.cancelled_by,
  cancelReason: b.cancel_reason,
  cancelledAt: b.cancelled_at,
  sessionsRequired: b.sessions_required,
  notes: b.notes,
  slotDate: b.slot_date,
  slotTime: b.slot_time,
  createdAt: b.created_at,
});



// A site_content row → camelCase. key_name is the CMS lookup key used by every public page.
export const toContentDTO = (c) => ({
  id: c.id,
  keyName: c.key_name,
  value: c.value,
  type: c.type,
  page: c.page,
  label: c.label,
  createdAt: c.created_at,
  updatedAt: c.updated_at,
});

// A form_submissions row (joined with forms.name) → camelCase, for the admin submissions inbox list.
export const toSubmissionDTO = (s) => ({
  id: s.id,
  formId: s.form_id,
  formName: s.form_name,
  clientFirstname: s.client_firstname,
  clientLastname: s.client_lastname,
  clientEmail: s.client_email,
  clientPhone: s.client_phone,
  status: s.status,
  createdAt: s.created_at,
});
