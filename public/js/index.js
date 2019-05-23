$(document).ready(function () {
  $("#AddYourMeme").on("submit", handleMemeSubmit);
  $(".like").on("click", handleMemeLike);
  $(".save").on("click", handleMemeSave);
  $(".delete").on("click", handleMemeDelete);
});

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

// $("#FormCategory").on("click", function (event) {
//   event.preventDefault();
//   var whatCat = $("#categorySelect").val();

//   $.get("/api/memes/categories/" + whatCat, function(data) {
//   });

// })

//TEST AREA
