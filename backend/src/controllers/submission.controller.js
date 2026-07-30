// Submission controller: receives quiz/form answers from the public, delegates validation
// and saving to handleSubmissionCreation, and exposes admin endpoints to read and manage submissions.
import asyncHandler from '../utils/asyncHandler.js';
import * as submissionModel from '../models/submission.model.js';
import * as submissionService from '../services/handleSubmissionCreation.js';
import { toSubmissionDTO } from '../utils/dto.js';

// create submission (public)
export const createSubmission = asyncHandler(async (req, res) => {
  const { formId, client, answers } = req.body;
  const submissionId = await submissionService.handleSubmissionCreation(formId, client, answers);

  res.status(201).json({
    message: 'Submission created',
    data: { id: submissionId },
  });
});

// get detailed submission by id (admin)
export const getSubmissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const details = await submissionModel.findSubmissionDetails(id);

  if (!details || details.length === 0) {
    return res.status(404).json({ message: 'Submission not found' });
  }

  const answerRows = details.filter((row) => row.answer_id);
  const fieldIds = [...new Set(answerRows.map((row) => row.answer_field_id))];
  const optionRows = await submissionModel.findOptionLabelsByFieldIds(fieldIds);

  // per field, map raw option value -> human label (TEXT fields have no options, so
  // their map stays empty and the raw answer value is used as-is)
  const labelsByField = new Map();
  for (const opt of optionRows) {
    if (!labelsByField.has(opt.field_id)) labelsByField.set(opt.field_id, new Map());
    labelsByField.get(opt.field_id).set(opt.value, opt.label);
  }

  const submission = {
    id: details[0].id,
    client: {
      firstName: details[0].client_firstname,
      lastName: details[0].client_lastname,
      email: details[0].client_email,
      phone: details[0].client_phone,
    },
    status: details[0].status,
    createdAt: details[0].created_at,
    answers: answerRows.map((row) => {
      const fieldLabels = labelsByField.get(row.answer_field_id);
      // CHECKBOX/RANK answers store comma-joined option values (e.g. "RIP_CURRENTS,REEF_BREAKS")
      const value = fieldLabels
        ? row.answer_value
            .split(',')
            .map((v) => fieldLabels.get(v) ?? v)
            .join(', ')
        : row.answer_value;
      return { question: row.question_label, value };
    }),
  };

  res.status(200).json({ data: submission });
});

// get all submissions, optionally filtered by form type (admin)
export const getAllSubmissions = asyncHandler(async (req, res) => {
  const { type } = req.query;

  const submissions = type
    ? await submissionModel.findSubmissionsByFormType(type)
    : await submissionModel.findAllSubmissions();

  res.status(200).json({ data: submissions.map(toSubmissionDTO) });
});

// update status (admin)
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const affectedRows = await submissionModel.updateSubmissionStatus(id, status);
  if (!affectedRows) return res.status(404).json({ message: 'Submission not found' });
  res.status(200).json({ message: 'Submission status updated' });
});

// delete submission (admin)
export const deleteSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const affectedRows = await submissionModel.deleteSubmission(id);

  if (!affectedRows) return res.status(404).json({ message: 'Submission not found' });
  res.status(200).json({ message: 'Submission deleted' });
});
