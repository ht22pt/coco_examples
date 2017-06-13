// ============================================================================
// create question set and state to go through the questions
// ============================================================================
var questions = new Array();
var state = 0;
var init_time = $.now();
// TODO: define list of image urls to load in this page
var im_urls = ["http://orig13.deviantart.net/ac5c/f/2011/345/8/0/business_cat_original_by_plasticpyre-d4irr6a.jpg",
  "http://orig03.deviantart.net/0336/f/2012/204/d/f/cute_cat_by_animexchibixmanga-d58ajxe.jpg",
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR-Mks10gAfyzFUEFgdISlD-2N-ymFK3KiirV1tl_gEyLTVy0ju"];

// ============================================================================
// initialize images
// ============================================================================
for (i = 0; i < im_urls.length; i++) {
  var im = new Image();
  var q = {};
  im.src = im_urls[i];
  q.im = im;
  q.ans = '';
  // TODO: add fields for identifying images here
  questions.push(q);
}

// ============================================================================
// page onload
// ============================================================================
$(window).load(function () {
  render_question(questions[0]);
  $("#dialog-modal").dialog({
    autoOpen: false,
    height: 250,
    modal: true,
    buttons: {
      'ok': function () {
        $(this).dialog("close");
      }
    }
  });
  addDialog();
  $("#dialog-modal").hide();
  $('#next').bind('click', function () {
    // Goto Step 2
    window.location.replace("coco_process_step_2.html");
  });
  $('#submit').bind('click', function () {
    next();
  });
  $('#clear').bind('click', function () {
    $('#description').val("");
  });
});

// ================================================================
// function to control next and previous question
// ===============================================================
function next() {
  var q = questions[state];
  // store user input
  q.ans = $('#description').val();
  if (q.ans.split(' ').length < 8) {
    render_dialog(7);
    return -1;
  }
  if (state < questions.length - 1) {
    state += 1;
  } else {
    $("#dialog-confirm").dialog('open');
  }
  render_question(questions[state]);
}
function prev() {
  if (state > 0) {
    state -= 1;
  }
  render_question(questions[state]);
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
  if (idx === 1) {
    var text = 'Do not describe unimportant details.';
  } else if (idx === 2) {
    var text = 'Do not describe things that might have happened in the future or past.';
  } else if (idx === 3) {
    var text = 'Do not describe what a person might say.';
  } else if (idx === 4) {
    var text = 'Do not give people proper names.';
  } else if (idx === 5) {
    var text = 'This is the BEST sentence! Please apply the same rule to describe following 3 images.';
  } else if (idx === 6) {
    var text = 'Please includes more details.';
  } else if (idx === 7) {
    var text = 'Please enter more than 8 words.';
  } else if (idx === 8) {
    var text = 'Error occured when submitting the form, please try again.';
  }
  $("#dialog-modal").text(text);
  $("#dialog-modal").dialog('open');
}

// ===========================================================
// add dialog for the web page
// ===========================================================
function addDialog() {
  $("#dialog-confirm").dialog({
    autoOpen: false,
    resizable: false,
    height: 140,
    modal: true,
    buttons: {
      "Yes": function () {
        $(this).dialog("close");
        submit_form();
      },
      Cancel: function () {
        $(this).dialog("close");
      }
    }
  });
  $(".ui-dialog").css('position', 'absolute');
}

// ===========================================================
// disable cut and paste on input text
// ===========================================================
$(document).ready(function () {
  $(document).on("cut copy paste", "#description", function (e) {
    e.preventDefault();
  });
});
