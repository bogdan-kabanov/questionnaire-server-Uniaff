'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('questionnaire_questions', 'geo', {
      type: Sequelize.INTEGER,
      references: {
        model: 'question_geo',
        key: 'id'
      },
      defaultValue: 0,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('questionnaire_questions', 'vertical', {
      type: Sequelize.INTEGER,
      references: {
        model: 'question_verticals',
        key: 'id'
      },
      defaultValue: 0,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questionnaire_questions', 'geo');
    await queryInterface.removeColumn('questionnaire_questions', 'vertical');
  }
};