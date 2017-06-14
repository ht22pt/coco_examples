// ============================================================================
// create question set and state to go through the questions
// ============================================================================
var url = "";
var next_url = "coco_process_step_2.html";
var questions = [];
var state = 0;
var init_time = $.now();
// TODO: define list of image urls to load in this page
// Need get image from list from server
var im_urls = ["http://orig13.deviantart.net/ac5c/f/2011/345/8/0/business_cat_original_by_plasticpyre-d4irr6a.jpg"];

// ============================================================================
// initialize images
// ============================================================================
for (i = 0; i < im_urls.length; i++) {
  var im = new Image();
  var q = {};
  im.src = im_urls[i];
  q.im = im;
  q.id = 1;
  q.ans = '';
  // TODO: add fields for identifying images here
  questions.push(q);
}

// ============================================================================
// page onload
// ============================================================================
$(window).load(function () {

  render_question(questions[0]);

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
  var q = questions[state];
  // store user input
  q.ans = $('#description').val();
  if (q.ans.split(' ').length < 8) {
    render_dialog(7);
    return -1;
  }

  var data = {
    image_id: q.id, // Image Id from server
    userId: 1,
    caption: q.ans
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
// rednering question, image, and dialog
// ==============================================================
function render_question(q) {
  render_im(q.im);
  $('.state-button').show();
  $('#description').show();
  $('#description').css('width', 480);
  $('#description').css('height', 100);
  $('#description').val(q.ans);
  $('#header').text('Please describe the image:');
}

function render_im(im) {
  im.height = im.height * 480 / im.width;
  im.width = 480;
  var c = $('#canvas')[0];
  if (im.width > im.height) {
    c.width = 480;
    c.height = im.height * 480 / im.width;
  } else {
    c.height = 360;
    c.width = im.width * 360 / im.height
  }
  var ctx = c.getContext("2d");
  ctx.drawImage(im, 0, 0, c.width, c.height);
}

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
    message : text
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
