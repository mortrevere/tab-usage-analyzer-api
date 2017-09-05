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
      if(!profile)
        return res.json({error : 'Profile not found'});

      genid(function(token) {
        models.Tabs.create({token : token}).then(function(tab) {
          tab.setProfile(profile);
          res.json({id : tab.token});
        });
      });
    });
  });

  app.put('/profile/:pid/tab/:tid/action', function(req, res) {
    if(!req.body.type) return res.json({error : 'Argument type missing'});
    if(req.body.type === 'url' && !req.body.value) return res.json({error : 'Argument value missing'});

    models.Profiles.find({ where : { token : req.params.pid }}).then(function(profile) {
      if(!profile)
        return res.json({error : 'Profile not found'});

      models.Tabs.find({ where : { token : req.params.tid }}).then(function(tab) {
        if(!tab)
          return res.json({error : 'Tab not found'});

        models.Actions.create({ type : req.body.type, value : req.body.type === 'url' ? req.body.value : ''}).then(function(action) {
          action.setTab(tab);
          res.json({done : true});
        });
      });
    });
  });

  app.get('/profile/:id', function(req, res) {
    models.Profiles.find({ where : { token : req.params.id },
                           include : [{
                             model : models.Tabs,
                             include : [{
                               model : models.Actions
                             }]
                           }]
                         }).then(function(profile) {
                           res.json(profile);
                         });
  });

}
