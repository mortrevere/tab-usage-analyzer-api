module.exports = function(sequelize, datatype) {

  var model = sequelize.define('Profiles', {
    token : {
      type : datatype.STRING(32)
    },
    name : {
      type : datatype.STRING
    }
  }, {
    timestamps: true
  });

  model.associate = function(models) {

  }

  return model;
};
