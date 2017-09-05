module.exports = function(sequelize, datatype) {

  var model = sequelize.define('Actions', {
    type : {
      type : datatype.STRING(32)
    },
    value : {
      type : datatype.STRING
    }
  }, {
    timestamps: true
  });

  model.associate = function(models) {
    model.belongsTo(models.Tabs);
  }

  return model;
};
