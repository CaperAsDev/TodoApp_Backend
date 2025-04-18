import { Model, DataTypes } from 'sequelize'
import { CATEGORY_TABLE } from './category.model.js'

const GOAL_TABLE = 'goal'

const GoalSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  motivation: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  header_image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
}

class Goal extends Model {
  static associate (models) {
    this.belongsTo(models.Category)
    this.hasMany(models.Objetive, {
      foreignKey: 'goal_id'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: GOAL_TABLE,
      modelName: 'Goal',
      timestamps: true
    }
  }
}

export { GOAL_TABLE, GoalSchema, Goal }
