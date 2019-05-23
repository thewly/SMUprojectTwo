$(document).ready(function() {
  //When the user hits the search button
  // eslint-disable-next-line prettier/prettier
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    console.log("button-test");

    //Save the book they typed into the meme-search input
    var memeSearched = $("#meme-search")
      .val()
      .trim();
    var postData = {
      memeSearched: memeSearched
    };
    //Make an AJAX get request to our api
    $.get("/api/memes/search/" + memeSearched, function() {
      console.log("posting?");
    }).then(function(data) {
      console.log(JSON.stringify(data));
      //don't need reload
      // location.reload();
      window.location = "/api/memes/search/" + memeSearched;
    });
  });

//   function renderMemes(data) {
//     for (var i = 0; i < data.length; i++) {
//       var div = $("<div>");

//       div.append("<h2>" + data[i].title + "</h2>");
//       div.append("<p>Author: " + data[i].cetegory + "</p>");
//       div.append("<p>Genre: " + data[i].about + "</p>");
//       div.append("<p>Pages: " + data[i].importance + "</p>");
//     }
//   }
});
