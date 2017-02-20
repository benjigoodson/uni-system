// backend api routes and auth calls
'use strict'

module.exports = function (app) {

  // Require other routes
  
  require('../middlewares/general')(app);
  require('../middlewares/auth')(app);

  app.use('/api/shop', require('./shop'))
  app.use('/api/product', require('./product'))
  app.use('/api/transaction', require('./transaction'))

  // Test api call
  app.get('/api', function(req, res) {
      console.log("Requested: GET - /api");
      res.json({ message : "API is online." });
  });

}