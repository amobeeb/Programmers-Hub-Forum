import models from '../../database/models';

const { Answers } = models;

export const answerQuestion = async (item, questionId) => {
  try {
    return await Answers.create({ ...item, questionId });
  } catch (error) {
    return error;
  }
};

export const updateAnswer = async (item, id) => {
  try {
    const parameters = item;
    const where = {
      where: {
        id,
      },
      returning: true,
    };
    return Answers.update(parameters, where);
  } catch (error) {
    return error;
  }
};

export const deleteAnswer = async (id) => {
  try {
    const where = {
      where: {
        id,
      },
    };
    return Answers.destroy(where);
  } catch (error) {
    return error;
  }
};

export const getOneAnswer = async (id, userId) => {
  try {
    const where = {
      where: {
        id,
        userId,
      },
    };
    return await Answers.findOne(where);
  } catch (err) {
    return err;
  }
};

export const getAllAnswerToAQuestion = async (questionId) => {
  try {
    const where = {
      where: {
        questionId,
      },
      order: [['createdAt', 'DESC']],
    };
    return await Answers.findAndCountAll(where);
  } catch (err) {
    return err;
  }
};
