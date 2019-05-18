var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/memes", function (req, res) {
    db.Memes.findAll({}).then(function (dbMemes) {
      res.json(dbMemes);
    });
  });

  // Get memes by category
  app.get("/api/memes/categories/:catergory", function (req, res) {
    db.Memes.findOne({
      where: {
        catergory: req.params.catergory
      }
    }).then(function (dbMemes) {
      console.log(dbMemes);
      res.json(dbMemes);
    });
  });




  // Create a new Meme
  //thanks cole
  //all your base are belong to us
  app.post("/api/memes", function (req, res) {
    db.Memes.create({
      title: req.body.FormName,
      imageUrl: req.body.FormURL,
      category: req.body.FormCategory,
      description: req.body.FormDesc
    }).then(function (results) {
      res.json(results);
    });
  });
};
