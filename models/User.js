module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Model {}

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(100),
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(100),
      field: 'last_name'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  });

  User.associate = (models) => {
    User.hasMany(models.Firm, { foreignKey: 'userId' });
    User.hasMany(models.Client, { foreignKey: 'userId' });
    User.hasMany(models.Product, { foreignKey: 'userId' });
    User.hasMany(models.Tax, { foreignKey: 'userId' });
    User.hasMany(models.Invoice, { foreignKey: 'userId' });
  };

  return User;
}; 