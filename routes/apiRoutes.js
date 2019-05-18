var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/memes", function(req, res) {
    db.Memes.findAll({}).then(function(dbMemes) {
      res.json(dbMemes);
    });
  });

// Get memes by category
app.get("/api/memes/categories/:catergory", function(req, res) {
  db.Memes.findOne({
    where: {
        catergory: req.params.catergory
    }
  }).then(function(dbMemes) {
    console.log(dbMemes);
    res.json(dbMemes);
  });
});




  // Create a new Meme
  app.post("/api/memes", function(req, res) {
    db.Memes.create(req.body).then(function(dbMemes) {
      res.json(dbMemes);
    });
  });

  
};
