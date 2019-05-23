var db = require("../models");

module.exports = function(app) {
  // app.get("/", function(req, res) {
  //   db.Meme.findAll({}).then(function(dbMeme) {
  //     res.render("index", {
  //       Meme: dbMeme
  //     });
  //   });
  // });

  // Get all examples
  app.get("/api/memes", function(req, res) {
    db.Meme.findAll({}).then(function(dbMemes) {
      res.json(dbMemes);
      res.redirect("/");
    });
  });

  //Get by Searched
  app.get("/api/memes/search/:memeSearched", function(req, res) {
    console.log(req.params.memeSearched);
    db.Meme.findAll({
      where: {
        title: req.params.memeSearched
      }
    }).then(function(results) {
      console.log("working?" + results);
      var hbsObject = {
        searchResults: results
      };
      res.render("example", hbsObject);
    });
  });

  // Get memes by category
  app.get("/api/memes/categories/:category", function(req, res) {
    db.Meme.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(dbMemes) {
      console.log(dbMemes);
      res.json(dbMemes);
      // res.render("categories", {
      //   Meme: dbMemes
      // });
    });
  });

  //Get Meme by ID
  app.get("/api/memes/:id", function(req, res) {
    db.Meme.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbMemes) {
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
    console.log(req.params.id);
    db.Meme.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.redirect("/");
    });
  });
};
