import models from '../../database/models';

const { comments } = models;

export const createComment = async (item, answerId) => {
  try {
    return await comments.create({ ...item, answerId });
  } catch (error) {
    return error;
  }
};

export const upadateComment = async (items, id) => {
  try {
    const parameter = items;
    const where = {
      where: {
        id,
      },
      returning: true,
    };
    return await comments.update(parameter, where);
  } catch (error) {
    return error;
  }
};

export const deleteComment = async (id) => {
  try {
    const where = {
      where: {
        id,
      },
    };
    return await comments.destroy(where);
  } catch (error) {
    return error;
  }
};

export const findOneComment = async (id, userId) => {
  try {
    const where = {
      where: {
        id,
        userId,
      },
    };
    return comments.findOne(where);
  } catch (error) {
    return error;
  }
};

export const findAllComment = async (questionId) => {
  try {
    const where = {
      where: {
        questionId,
      },
      order: [['createdAt', 'DESC']],
    };
    return comments.findAll(where);
  } catch (error) {
    return error;
  }
};
