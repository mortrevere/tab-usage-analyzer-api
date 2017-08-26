module.exports = function(app, pg) {

  require('fs').readdirSync('routes/').filter(function(file) {
    return file !== 'index.js';
  }).forEach(function(file) {
    process.stdout.write('Loading ' + file + '...');
    require('./' + file)(app, pg);
    console.log('done.');
  });

};



