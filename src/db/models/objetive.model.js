import { Model, DataTypes } from 'sequelize'
import { GOAL_TABLE } from './goal.model.js'

const OBJETIVE_TABLE = 'objective'

const ObjetiveSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  goal_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: GOAL_TABLE,
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
  progress: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  header_image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
}

class Objetive extends Model {
  static associate (models) {
    this.belongsTo(models.Goal)
    this.hasMany(models.Task, {
      foreignKey: {
        allowNull: false,
        name: 'objetive_id'
      }
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: OBJETIVE_TABLE,
      modelName: 'Objetive',
      timestamps: true
    }
  }
}

export { OBJETIVE_TABLE, ObjetiveSchema, Objetive }
