import asyncHandler from '../utils/asyncHandler.js';
import * as contentModel from '../models/siteContent.model.js';
import { toContentDTO } from '../utils/dto.js';

// get all content
export const getAllContent = asyncHandler(async (req, res) => {
  const content = await contentModel.findAllContent();
  res.json({ data: content.map(toContentDTO) });
});

// get content by page
export const getContentByPage = asyncHandler(async (req, res) => {
  const { pageName } = req.params;
  const rows = await contentModel.findContentByPage(pageName);
  if (!rows.length) return res.status(404).json({ message: 'Page not found.' });
  res.status(200).json({ data: rows.map(toContentDTO) });
});

// get content by key
export const getContentByKey = asyncHandler(async (req, res) => {
  const { keyName } = req.params;
  const content = await contentModel.findContentByKey(keyName);
  if (!content) return res.status(404).json({ message: 'Content not found.' });
  res.json({ data: toContentDTO(content) });
});
// update content by key

export const updateContentByKey = asyncHandler(async (req, res) => {
  const { keyName } = req.params;
  const { value, page, label, type } = req.body;

  if (!page || !label || !type) {
    return res.status(400).json({ message: 'page, label, and type are required.' });
  }

  await contentModel.updateContent(keyName, page, label, type, value);
  res.status(200).json({ message: 'Content updated' });
});
