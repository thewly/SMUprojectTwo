$(document).ready(function () {

  $("#AddYourMeme").on("submit", function handleFormSubmit(event) {
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
  });
});

function submitMeme(Meme) {
  $.post("/api/memes/", Meme, function () {
    console.log("posting?");
  }).then(function(data) {
    console.log("test" + data);
    //don't need reload
    location.reload();
    window.location.href = "/#AllMemes";
  });
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

function handleMemeDelete() {
  var currentMeme = $(this)
    .parent()
    .parent()
    .data("post");
  deletePost(currentPost.id);
}
