$(document).ready(function () {
  var memeName = $("#FormName");
  var memeUrl = $("#FormURL");
  var memeCat = $("#FormCategory");
  var memeDesc = $("#FormDesc");
  var sub = $("#AddYourMeme");
  $(sub).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
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

  function submitMeme(Meme) {
    $.post("/api/memes/", Meme, function() {
      console.log("posting?");
    }).then(function(data) {
      console.log("test" + data);
      //don't need reload
      // location.reload();
      window.location.href = "/#AllMemes";
    });
  }
  
});
