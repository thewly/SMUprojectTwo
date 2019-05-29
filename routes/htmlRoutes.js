var db = require("../models");
console.log(db.Meme);
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Meme.findAll({}).then(function(dbMeme) {
      res.render("index", {
        Meme: dbMeme
      });
    });
  });

  // app.get("/categories", function(req, res) {
  //   res.render("categories");
  // });

  app.get("/team", function(req, res) {
    db.Meme.findAll({}).then(function(dbMeme) {
      res.render("team", {
        Meme: dbMeme
      });
    });
  });

  app.get("/categories", function(req, res) {
    db.Meme.findAll({}).then(function(dbMeme) {
      res.render("categories", {
        Meme: dbMeme
      });
    });
  });

  app.get("/categories/:category", function(req, res) {
    db.Meme.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(dbMeme) {
      res.render("categories", {
        Meme: dbMeme
      });
    });
  });

  app.get("/allMemes", function(req, res) {
    db.Meme.findAll({}).then(function(dbMeme) {
      res.render("allMemes", {
        Meme: dbMeme
      });
    });
  });

  app.get("/popularMemes", function(req, res) {
    db.Meme.findAll({}).then(function(dbMeme) {
      dbMeme.sort(function compare(a, b) {
        if (a.importance > b.importance) {
          return -1;
        }
        if (a.importance < b.importance) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      res.render("popularMemes", {
        Meme: dbMeme
      });
    });
  });

  app.get("/addAMeme", function(req, res) {
    db.Meme.findAll({}).then(function(dbMeme) {
      res.render("addAMeme", {
        Meme: dbMeme
      });
    });
  });

  app.get("/searchResults", function(req, res) {
    db.Meme.findAll({}).then(function(dbMeme) {
      res.render("searchResults", {
        Meme: dbMeme
      });
    });
  });

  app.get("/memeWars", function(req, res) {
    db.Meme.findAll({}).then(function(dbMeme) {
      res.render("memeWar", {
        Meme: dbMeme
      });
    });
  });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
