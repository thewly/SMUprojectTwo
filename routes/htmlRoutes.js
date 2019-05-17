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

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
