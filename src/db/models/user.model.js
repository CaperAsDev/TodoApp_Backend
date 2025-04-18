import { Model, DataTypes } from 'sequelize'

const USER_TABLE = 'users'

const UserSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  profile_image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  recoveryToken: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  }
}

class User extends Model {
  static associate (models) {
    this.hasMany(models.Category, {
      foreignKey: 'user_id',
      allowNull: false
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true
    }
  }
}

export { USER_TABLE, UserSchema, User }
