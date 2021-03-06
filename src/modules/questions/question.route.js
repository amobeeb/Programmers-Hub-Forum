/* eslint-disable import/no-cycle */
import express from 'express';
import {
  saveQuestion,
  editQuestion,
  destroyQuestion,
  fetchAllQuestion,
  fetchOneSpeciicfQuestionWithAnswer,
  fetchAllUpvote,
  fetchAllDownVote,
  fetchCountoFuserQuestion,
  fetchRelatedQuestion,
} from './question.controller';
import { validateInput } from '../middleware/validation';
import { questionSchema, editQuestionSchema } from '../middleware/schema/question';
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
 * /updateQuestion/:id:
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
 * /deleteQuestion/:id:
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
 * /:questionId/get:
 *  delete:
 *    tags:
 *      - Delete Question
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
questionRoutes.get('/:id/fetch-question/', fetchOneSpeciicfQuestionWithAnswer);

/**
 * @swagger
 *
 * /allQuestions:
 *  get:
 *    tags:
 *      - All questions
 *    description: User should be all be to see all question
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Server error message
 */
questionRoutes.get('/questions/:id/allQuestions/', fetchAllQuestion);

/**
 * @swagger
 *
 * /question/:id/totalUpvote:
 *  get:
 *    tags:
 *      - All questions
 *    description: User should be see the number of upvote on a question
 *    parameters:
 *      - name: id
 *        description: Questionid
 *        required: true
 *        type: uuid
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Server error message
 */
questionRoutes.get('/question/:id/totalUpvote', fetchAllUpvote);

/**
 * @swagger
 *
 * /question/:id/totalDownvote:
 *  get:
 *    tags:
 *      - All questions
 *    description: User should be see the number of downvote on a question
 *    parameters:
 *      - name: id
 *        description: Questionid
 *        required: true
 *        type: uuid
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Server error message
 */
questionRoutes.get('/question/:id/totalDownvote', fetchAllDownVote);

/**
 * @swagger
 *
 * /allQuestions:
 *  get:
 *    tags:
 *      - All questions
 *    description: User should be all be to see the number of question they have asked in the forum
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Server error message
 */
questionRoutes.get('/user/:userId/question-count', fetchCountoFuserQuestion);

questionRoutes.get('/question/related', fetchRelatedQuestion);

export default questionRoutes;
