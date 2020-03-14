import Response from '../../utils/index';
import models from '../../database/models';
import {
  upadateComment,
  deleteComment,
  findOneComment,
} from '../../services/comments/comments.services';
import {
  COMMENT_DELETED,
  SERVER_ERROR,
  COMMENT_SUCCESS,
  COMMENT_UPDATED,
  CANNOT_EDIT_COMMENT,
  CANNOT_DELETE_COMMENT,
  AUTHORISED,
} from '../../utils/constant';

const { comments } = models;

export const saveComment = async (req, res) => {
  try {
    const { answerId } = req.params;

    const question = await comments.create(req.body, answerId);
    return Response(res, {
      status: 201,
      message: COMMENT_SUCCESS,
      data: question,
    });
  } catch (err) {
    return Response(res, { status: 500, message: SERVER_ERROR });
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, type, comment } = req.body;
    const findOne = await findOneComment(commentId, userId);

    if (!findOne && type === AUTHORISED) {
      const edit = await upadateComment({ comment }, commentId);

      return Response(res, { status: 200, message: COMMENT_UPDATED, data: edit });
    }

    if (!findOne) {
      return Response(res, { status: 401, message: CANNOT_EDIT_COMMENT });
    }

    const edit = await upadateComment({ comment }, commentId);
    return Response(res, { status: 200, message: COMMENT_UPDATED, data: edit });
  } catch (error) {
    return Response(res, { status: 500, message: SERVER_ERROR });
  }
};

export const destroyComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, type } = req.body;
    const findOne = await findOneComment(commentId, userId);

    if (!findOne && type === AUTHORISED) {
      await deleteComment(commentId);
      return Response(res, { status: 200, message: COMMENT_DELETED });
    }

    if (!findOne) {
      return Response(res, { status: 401, message: CANNOT_DELETE_COMMENT });
    }

    await deleteComment(commentId);
    return Response(res, { status: 200, message: COMMENT_DELETED });
  } catch (error) {
    return Response(res, { status: 500, message: SERVER_ERROR });
  }
};
// export const fetchOneOmment = async () => {};
