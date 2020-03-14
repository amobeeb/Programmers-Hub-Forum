module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    'comments',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      userId: DataTypes.INTEGER,
      answerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Answers',
          key: 'id',
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { tableName: 'comments' }
  );
  // comments.associate = (models) => {
  //   const { Questions } = models;
  //   comments.belongsTo(Questions, { foreignKey: 'questionId' });
  // };
  return comments;
};
