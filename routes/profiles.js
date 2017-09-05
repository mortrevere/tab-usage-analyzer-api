var crypto = require('crypto');
var jump = require('basejump');

function genid(cb) {
  crypto.randomBytes(48, function(err, buffer) {
    cb(jump.toBase62(Array.prototype.slice.call(buffer, 0)))
  });
};

module.exports = function(app, models) {

  app.get('/token', function(req, res) {
    genid(function(token) {
      res.json({
        token : token
      });
    });

  });

  app.post('/update', function(req, res) {
    res.json(req.body);
  });

  app.put('/profile', function(req, res) {
    genid(function(token) {
      models.Profiles.create({ token : token, name : '(untitled)'}).then(function(profile) {
        res.json({id : profile.token});
      });
    });
  });

  app.put('/profile/:id/tab', function(req, res) {

    models.Profiles.find({ where : { token : req.params.id }}).then(function(profile) {
      console.log(profile);
      models.Tabs.create().then(function(tab) {
        tab.setProfile(profile);
        res.json({id : tab.id});
      });
    });



  });

}
