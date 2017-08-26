module.exports = function(app) {

  require('fs').readdirSync('routes/').filter(function(file) {
    return file !== 'index.js';
  }).forEach(function(file) {
    process.stdout.write('Loading ' + file + '...');
    require('./' + file)(app);
    console.log('done.');
  });

};



