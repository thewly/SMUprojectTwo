$(document).ready(function() {
  $("#AddYourMeme").on("submit", handleMemeSubmit);
  $(".like").on("click", handleMemeLike);
  $(".save").on("click", handleMemeSave);
  $(".delete").on("click", handleMemeDelete);
  $("#FormCategory").on("click", handleMemeSearch);
  $("#search-btn").on("click", function runSearch(event) {
    console.log("search hit");
    event.preventDefault();
    console.log("button-test");
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
});

var container = $(".meme-container");

//the functions that make everything above work live here

function handleMemeSubmit(event) {
  console.log("Meme submitted!");
  event.preventDefault();
  var memeName = $("#FormName");
  var memeUrl = $("#FormURL");
  var memeCat = $("#FormCategory");
  var memeDesc = $("#FormDesc");
  if (!memeUrl.val().trim() && !memeName.val().trim()) {
    return;
  }
  var newMeme = {
    title: memeName.val().trim(),
    imageUrl: memeUrl.val().trim(),
    category: memeCat.val().trim(),
    about: memeDesc.val().trim()
  };
  submitMeme(newMeme);
}

function submitMeme(Meme) {
  $.post("/api/memes/", Meme, function () {
    console.log("posting?");
  }).then(function (data) {
    console.log("test" + data);
    //don't need reload
    location.reload();
    window.location.href = "/#AllMemes";
  });
}

// DELETE Stuff
function handleMemeDelete() {
  console.log("Delete hit!");
  var currentMeme = $(this)
    .parent()
    .parent()
    .parent()
    .data("meme");
  console.log(currentMeme);
  deleteMeme(currentMeme);
}

function deleteMeme(id) {
  $.ajax({
    method: "DELETE",
    url: "/api/memes/" + id
  }).then(function() {
    location.reload();
    window.location.href = "/#AllMemes";
  });
}

//Like Stuff
function handleMemeLike() {
  console.log("Meme liked!");
  var currentLike = $(this)
    .parent()
    .data("likes");
  if (currentLike === "") {
    console.log("in here!");
    currentLike = 0;
    //console.log(currentLike);
  } //else {
  console.log(currentLike);
  likeMeme(currentLike);
}

function likeMeme(like) {
  var id = $(this)
    .parent()
    .parent()
    .parent()
    .data("meme");
  like++;
  var newLike = like;
  var data = { "importance": "newLike" };
  console.log(data);
  $.ajax({
    type: "PUT",
    data: data,
    url: "/api/memes/" + id
  }).then(function() {
    location.reload();
    window.location.href = "/#AllMemes";
  });
}

//Save Stuff
function handleMemeSave() {
  console.log("Meme Saved!");
}

//TEST AREA

function handleMemeSearch(event) {
  event.preventDefault();
  var whatCat = $("#categorySelect").val();
  $.get("/api/memes/categories/" + whatCat, function(data) {
    // document.write(data);
    console.log(data);
    buildSearch(data);
  });
}

function buildSearch(data) {
  container.empty();
  for (var i = 0; i < data.length; i++) {
    var id = data[i].id;
    var title = data[i].title;
    var imageUrl = data[i].imageUrl;
    var importance = data[i].importance;
    var about = data[i].about;

    var newMeme = $("<div>");
    newMeme.addClass("col-sm-3");
    newMeme.append(cardDeck);

    var cardDeck = $("<div>");
    cardDeck.addClass("card-deck");
    cardDeck.attr("data-meme", id);
    cardDeck.append(card);

    var card = $("<div>");
    card.addClass("card");
    card.append(image);
    card.append(cardDiv);

    var cardDiv = $("<div>");
    cardDiv.addClass("card-body");
    cardDiv.attr("data-likes", importance);
    cardDiv.append(name);
    cardDiv.append(aboutText);
    cardDiv.append(likes);
    cardDiv.append(deleteBtn);
    cardDiv.append(likeBtn);
    cardDiv.append(saveBtn);

    var image = $("<img>");
    image.addClass("card-img-top");
    image.attr("src", imageUrl);

    var name = $("<h5>");
    name.addClass("card-title");
    name.text(title);

    var aboutText = $("<p>");
    aboutText.addClass("card-text");
    aboutText.text(about);

    var likes = $("<p>");
    likes.addClass("card-text");
    likes.text(importance);

    var deleteBtn = $("<button>");
    deleteBtn.addClass("btn btn-danger delete");
    deleteBtn.html("<i class='far fa-trash-alt'></i>");

    var likeBtn = $("<button>");
    likeBtn.addClass("btn btn-danger delete");
    likeBtn.html("<i class='far fa-thumbs-up'></i>");

    var saveBtn = $("<button>");
    saveBtn.addClass("btn btn-danger delete");
    saveBtn.html("<i class='far fa-save'></i>");
    container.append(newMeme);
  }
}
