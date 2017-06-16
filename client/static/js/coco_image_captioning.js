// ============================================================================
// create question set and state to go through the questions
// ============================================================================

// TODO: define list of image urls to load in this page
// Need get image from list from server
var url = "http://127.0.0.1:3100/setCaption";
var next_url = "coco_process_step_2.html";

// ============================================================================
// initialize images
// ============================================================================

//var im_url = "http://orig13.deviantart.net/ac5c/f/2011/345/8/0/business_cat_original_by_plasticpyre-d4irr6a.jpg";
var im_url = "static/img/demo/483646.jpg";
var im_id = 1;
var caption = "";

// ============================================================================
// page onload
// ============================================================================
$(window).load(function () {

  $('#image').attr("src", im_url);
  $('#caption').val(caption);

  $('#next').bind('click', function () {
    // Goto Step 2
    window.location.replace(next_url);
  });
  $('#submit').bind('click', function () {
    submit();
  });
  $('#clear').bind('click', function () {
    $('#description').val("");
  });
});

// ================================================================
// function to control next and previous question
// ===============================================================

function submit() {

  // store user input
  caption = $('#description').val();
  if (caption.length < 8) {
    render_dialog(7);
    return -1;
  }

  var data = {
    image_id: im_id, // Image Id from server
    userId: 1,
    caption: caption
  };

  $.ajax({
    type: "POST",
    url: url,
    data: data
  }).success(function (result, status, xhr) {
    console.log("Done");
  }).error(function (xhr, status, error) {
    console.log(data);
  });
}

// ===============================================================
// rednering dialog
// ==============================================================

function render_dialog(idx) {
  var text = "";
  if (idx === 1) {
    text = 'Do not describe unimportant details.';
  } else if (idx === 2) {
    text = 'Do not describe things that might have happened in the future or past.';
  } else if (idx === 3) {
    text = 'Do not describe what a person might say.';
  } else if (idx === 4) {
    text = 'Do not give people proper names.';
  } else if (idx === 5) {
    text = 'This is the BEST sentence! Please apply the same rule to describe following 3 images.';
  } else if (idx === 6) {
    text = 'Please includes more details.';
  } else if (idx === 7) {
    text = 'Please enter more than 8 words.';
  } else if (idx === 8) {
    text = 'Error occured when submitting the form, please try again.';
  }

  BootstrapDialog.show({
    type: 'type-danger',
    title: 'ERROR',
    message: text
  });
}

// ===========================================================
// disable cut and paste on input text
// ===========================================================
$(document).ready(function () {
  $(document).on("cut copy paste", "#description", function (e) {
    e.preventDefault();
  });
});
