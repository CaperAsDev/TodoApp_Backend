import { DataTypes, Model } from 'sequelize'
import { USER_TABLE } from './user.model.js'

const CATEGORY_TABLE = 'category'

const CategorySchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  header_image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: USER_TABLE,
      key: 'id'
    }
  }
}

class Category extends Model {
  static associate (models) {
    this.belongsTo(models.User)
    this.hasMany(models.Goal, {
      foreignKey: 'category_id',
      allowNull: false
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: true
    }
  }
}

export { CATEGORY_TABLE, CategorySchema, Category }
