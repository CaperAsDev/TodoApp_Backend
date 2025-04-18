import { Model, DataTypes } from 'sequelize'
import { TASK_TABLE } from './task.model.js'

const TASKCOMMENT_TABLE = 'taskcomment'

const TaskCommentSchema = {
  id: {
    type: DataTypes.UUID,
    defaultvalue: DataTypes.UUIDV4,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  task_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: TASK_TABLE,
      key: 'id'
    }
  }
}

class TaskComment extends Model {
  static associate (models) {
    this.belongsTo(models.Task)
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TASKCOMMENT_TABLE,
      modelName: 'TaskComment',
      timestamps: true
    }
  }
}

export { TASKCOMMENT_TABLE, TaskCommentSchema, TaskComment }
