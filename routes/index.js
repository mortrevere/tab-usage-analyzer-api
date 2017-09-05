module.exports = function(app, models) {

  require('fs').readdirSync('routes/').filter(function(file) {
    return file !== 'index.js' && file[0] !== '#';
  }).forEach(function(file) {
    process.stdout.write('Loading ' + file + '...');
    require('./' + file)(app, models);
    console.log('done.');
  });

};



