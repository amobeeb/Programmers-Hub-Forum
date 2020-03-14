import models from '../../database/models';
import questionRoutes from '../../modules/questions/question.route';

const { Questions } = models;

export const createQuestion = async (items) => {
  try {
    return await Questions.create(items);
  } catch (error) {
    return error;
  }
};

export const upadateQuestion = async (items, id) => {
  try {
    const parameter = items;
    const where = {
      where: {
        id,
      },
      returning: true,
    };
    return await Questions.update(parameter, where);
  } catch (error) {
    return error;
  }
};

export const deleteQuestion = async (id) => {
  try {
    const where = {
      where: {
        id,
      },
    };
    return await Questions.destroy(where);
  } catch (error) {
    return error;
  }
};

export const findOneQuestion = async (id, userId) => {
  try {
    const where = {
      where: {
        id,
        userId,
      },
    };
    return Questions.findOne(where);
  } catch (error) {
    return error;
  }
};

export const getSpecificQuestion = async (id) => {
  try {
    const where = {
      where: {
        id,
      },
      order: [['createdAt', 'DESC']],
    };
    return await Questions.findOne(where);
  } catch (err) {
    return err;
  }
};
