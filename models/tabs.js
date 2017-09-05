module.exports = function(sequelize, datatype) {

  var model = sequelize.define('Tabs', {
    token : {
      type : datatype.STRING(32)
    }
  }, {
    timestamps: true
  });

  model.associate = function(models) {
    model.belongsTo(models.Profiles);
    model.hasMany(models.Actions);
  }

  return model;
};
