// Form submission service. Validates answers against the live form structure,
// strips HTML from all user input, then saves the submission and its answers atomically.
import { db } from '../config/db.js';
import * as submissionModel from '../models/submission.model.js';
import sanitizeHtml from 'sanitize-html';
import * as formModel from '../models/form.model.js';

const sanitize = (value) =>
  sanitizeHtml(String(value), {
    allowedTags: [],
    allowedAttributes: {},
  });

export const handleSubmissionCreation = async (formId, client, answers) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // get form structure
    const fields = await formModel.findFieldsByFormId(formId);
    const allowedFieldIds = fields.map((field) => field.id);

    // check valid field ids
    for (const answer of answers) {
      if (!allowedFieldIds.includes(answer.fieldId)) {
        throw new Error(`Invalid fieldId: ${answer.fieldId}`);
      }
    }

    // check required fields are answered
    const requiredFields = fields.filter((field) => field.is_required);
    const answeredFieldIds = answers.map((answer) => answer.fieldId);
    for (const field of requiredFields) {
      if (!answeredFieldIds.includes(field.id)) {
        throw new Error(`Missing required field: ${field.id}`);
      }
    }

    // clean user input
    const cleanAnswers = answers.map((answer) => ({
      fieldId: answer.fieldId,
      value: sanitize(answer.value),
    }));

    // save submission
    const submissionId = await submissionModel.createSubmission(connection, {
      formId,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
    });

    // save answers
    await submissionModel.insertAnswers(connection, submissionId, cleanAnswers);

    await connection.commit();
    return submissionId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
