module.exports = (sequelize, DataTypes) => {
  class Client extends sequelize.Model {}

  Client.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contactPerson: {
      type: DataTypes.STRING(100),
      field: 'contact_person'
    },
    email: {
      type: DataTypes.STRING(255),
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(50)
    },
    address: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.STRING(100)
    },
    state: {
      type: DataTypes.STRING(100)
    },
    postalCode: {
      type: DataTypes.STRING(20),
      field: 'postal_code'
    },
    country: {
      type: DataTypes.STRING(100)
    },
    taxNumber: {
      type: DataTypes.STRING(100),
      field: 'tax_number'
    },
    notes: {
      type: DataTypes.TEXT
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
    modelName: 'Client',
    tableName: 'clients',
    timestamps: true
  });

  Client.associate = (models) => {
    Client.belongsTo(models.User, { foreignKey: 'userId' });
    Client.hasMany(models.Invoice, { foreignKey: 'clientId' });
  };

  return Client;
}; 