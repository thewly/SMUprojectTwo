var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/memes", function(req, res) {
    db.Meme.findAll({}).then(function(dbMemes) {
      res.json(dbMemes);
      res.redirect("/");
    });
  });

  // Get memes by category
  app.get("/api/memes/categories/:category", function(req, res) {
    db.Meme.findOne({
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
    db.Meme.create({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      about: req.body.about
    }).then(function(dbMemes) {
      res.json(dbMemes);
      res.end();
    });
  });

  // Meme deletion
  app.delete("/api/memes/:id", function(req, res) {
    db.Meme.destroy({
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
    db.Meme.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function() {
      res.redirect("/");
    });
  });
};
