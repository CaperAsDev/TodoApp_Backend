import { User, UserSchema } from './user.model.js'
import { Category, CategorySchema } from './category.model.js'
import { Goal, GoalSchema } from './goal.model.js'
import { Objetive, ObjetiveSchema } from './objetive.model.js'
import { Task, TaskSchema } from './task.model.js'
import { TaskComment, TaskCommentSchema } from './taskComment.model.js'

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Goal.init(GoalSchema, Goal.config(sequelize))
  Objetive.init(ObjetiveSchema, Objetive.config(sequelize))
  Task.init(TaskSchema, Task.config(sequelize))
  TaskComment.init(TaskCommentSchema, TaskComment.config(sequelize))

  User.associate(sequelize.models)
  Category.associate(sequelize.models)
  Goal.associate(sequelize.models)
  Objetive.associate(sequelize.models)
  Task.associate(sequelize.models)
  TaskComment.associate(sequelize.models)
}

export default setupModels
