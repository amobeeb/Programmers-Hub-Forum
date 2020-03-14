/* eslint-disable import/no-cycle */
import express from 'express';
import {
  saveQuestion,
  editQuestion,
  destroyQuestion,
  fetchOneSpeciicfQuestionWithComment,
} from './question.controller';
import { validateInput } from '../middleware/validation';
import { questionSchema, editQuestionSchema } from '../middleware/schema/schema';
import imageUpload from '../middleware/image_upload/upload';

const questionRoutes = express.Router();

/**
 * @swagger
 *
 * /createQuestion:
 *  post:
 *    tags:
 *      - Ask Questions
 *    description: User should be able to ask a question in the forum
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId 
 *        description: The id of the user who asked the question (please use the userId to get their username from your database  when consuming the endpoint)
 *        in: request session
 *        required: true
 *        type: integer
 *      - name: title
 *        description: The title of the question
 *        in: formData
 *        required: true
 *        type: string
 *      - name: question
 *        description: The content or body of the question
 *        in: formData
 *        required: true
 *        type: string
 *      - name: image
 *        description: Image related to the post if any
 *        in: formData
 *        required: required
 *        type: string
 *      - name: tags
 *        description: The programming language or any aspect of technology
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: Successfully created a question
 *      500:
 *        description: Server error message
 */
questionRoutes.post('/createQuestion', validateInput(questionSchema), imageUpload, saveQuestion);

/**
 * @swagger
 *
 * /:id/updateQuestion:
 *  patch:
 *    tags:
 *      - Update Question
 *    description: User should be able to update their
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: question id 
 *        description: Question id
 *        in: request session
 *        required: false
 *        type: integer
 *      - name: title
 *        description: The title of the question
 *        in: formData
 *        required: true
 *        type: string
 *      - name: question
 *        description: The content or body of the question
 *        in: formData
 *        required: false
 *        type: string
 *      - name: image
 *        description: Image related to the post if any
 *        in: formData
 *        required: false
 *        type: string
 *      - name: tags
 *        description: The programming language or any aspect of technology
 *        in: formData
 *        required: false
 *        type: string

 *    responses:
 *      201:
 *        description: Successfully created a question
 *      500:
 *        description: Server error message
 */
questionRoutes.patch(
  '/:id/updateQuestion',
  validateInput(editQuestionSchema),
  imageUpload,
  editQuestion
);

/**
 * @swagger
 *
 * /:id/deleteQuestion:
 *  delete:
 *    tags:
 *      - Delete Question
 *    description: User should be able to delete a question
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: id
 *        description: Questionid
 *        required: false
 *        type: integer
 *    responses:
 *      200:
 *        description: Successfully created a question
 *      404:
 *        description: Question not found
 *      500:
 *        description: Server error message
 */
questionRoutes.delete('/:id/deleteQuestion/', destroyQuestion);

/**
 * @swagger
 *
 * /:id/fetch-question:
 *  get:
 *    tags:
 *      - Specific Question
 *    description: User should be able to get a question and all comments attached to it
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: id
 *        description: Questionid
 *        required: true
 *        type: uuid
 *    responses:
 *      200:
 *        description: Successfully created a question
 *      500:
 *        description: Server error message
 */
questionRoutes.get('/:id/fetch-question/', fetchOneSpeciicfQuestionWithComment);
export default questionRoutes;
