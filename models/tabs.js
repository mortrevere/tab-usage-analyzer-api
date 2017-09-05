module.exports = function(sequelize, datatype) {

  var model = sequelize.define('Tabs', {

  }, {
    timestamps: true
  });

  model.associate = function(models) {
    model.belongsTo(models.Profiles);
  }

  return model;
};
