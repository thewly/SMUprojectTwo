var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Meme.findAll({}).then(function(dbMeme) {
      res.render("index", {
        Meme: dbMeme
      });
    });
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
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

  // Get a specific meme
  // app.post("/api/memes/search", function(req, res) {
  //   console.log(req.body.memeSearched);
  //   db.Meme.findAll({
  //     where: {
  //       title: req.body.memeSearched
  //     }
  //   }).then(function(results) {
  //     console.log("working?" + results);
  //     var hbsObject = {
  //       searchResults: results
  //     };
  //     res.render("example", hbsObject);
  //   });
  // });

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
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
