import { Model, DataTypes } from 'sequelize'
import { OBJETIVE_TABLE } from './objetive.model.js'

const TASK_TABLE = 'task'

const TaskSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  objetive_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: OBJETIVE_TABLE,
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
  status: {
    type: DataTypes.ENUM(['pending', 'completed', 'paused', 'started']),
    defaultValue: 'pending'
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  header_image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
}

class Task extends Model {
  static associate (models) {
    this.belongsTo(models.Objetive)
    this.hasMany(models.TaskComment, {
      foreignKey: {
        name: 'task_id',
        allowNull: false
      }
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timestamps: true
    }
  }
}

export { TASK_TABLE, TaskSchema, Task }
