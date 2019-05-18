var db = require("../models");

module.exports = function(app) {
  
  // Get all examples
  app.get("/api/memes", function(req, res) {
    db.Memes.findAll({}).then(function(dbMemes) {
      res.json(dbMemes);
    });
  });

  // Get memes by category
  app.get("/api/memes/categories/:category", function(req, res) {
    db.Memes.findOne({
      where: {
        category: req.params.category
      }
    }).then(function(dbMemes) {
      console.log(dbMemes);
      res.json(dbMemes);
    });
  });

  // Create a new Meme
  app.post("/api/memes", function(req, res) {
    console.log(req.body);
    db.Memes.create(req.body).then(function(results) {
      res.redirect("/");
    });
  });

  // Meme deletion
  app.delete("/api/memes/:id", function(req, res) {
    db.Memes.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      var obj = {
        meme: results
      };
      res.render("index", obj);
    });
  });

  //Meme update
  app.put("/api/memes/:id", function(req, res) {
    db.Memes.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function() {
      res.redirect("/");
    });
  });
};
