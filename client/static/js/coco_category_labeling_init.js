// define images for each task
// TODO: replace your image urls
// each task contains 11 sets of supercategory to annotate
var im_url = "http://orig13.deviantart.net/ac5c/f/2011/345/8/0/business_cat_original_by_plasticpyre-d4irr6a.jpg";
var url = "";
var next_url = "coco_process_step_2.html";
var img_id = 1;

// define supercateogry and category as array
var supercats = [];
var categories = [];

// define icons for all tasks
// icons_all is a two dimensional array
// first index for images and the second index for icons
// the normalized (x,y) coordinates is stored in each icon
var icons_all = [];

// define questions
var questions = [];

// define state variables that controls ui
var supercat_cursor = 0;
/*
 for (i = 0; i < im_urls.length; i++) {
 supercat_cursor[i] = 0;
 }
 */
var task_cursor = 0;
var N_task = 1;

// flag for images that can't be loaded
// these images will be skipped
var im_err = [];

// ====================================================
// ================= action button ====================
// ====================================================

$(document).ready(function () {

  $('#next').bind('click', function () {
    // Goto Step 3
    window.location.replace("coco_process_step_3.html");
  });
  $('#previous').bind('click', function () {
    window.location.replace("coco_process_step_1.html");
  });
  $('#submit').bind('click', function () {
    // show annotations here
    // i: image index; j: category index
    var results = [];
    for (j = 0; j < icons_all.length; j++) {
      if (icons_all[j]['isselected'] === 1) {
        results.push({
          cat_id: icons_all[j].cat_id,
          supercat_id: icons_all[j].supercat_id
        })
      }
    }

    var data = {
      image_id: img_id, // Image Id from server
      userId: 1,
      categories: results
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
  });

  // ====================================================
  // ================= prepare data =====================
  // ====================================================

  var im = new Image();
  var q = {};
  im.src = im_url;
  q.im = im;
  q.ans = '';
  // TODO: add fields for identifying images here
  questions.push(q);

  // ================= define supercategory =============
  $.ajax({
    url: 'static/data/super_category.json',
    dataType: 'json',
    data: {},
    async: false,
    success: function (json) {
      //Process data retrieved
      supercats = json;
    }
  });

  // ================= define categories =============
  $.ajax({
    url: 'static/data/category.json',
    dataType: 'json',
    data: {},
    async: false,
    success: function (json) {
      //Process data retrieved
      categories = json;
    }
  });

  // ================= define icons =============
  var icons = [];
  for (j = 0; j < categories.length; j++) {
    var cat = categories[j];
    var img_src = "static/img/categories/" + cat.cat_id + ".png";
    icons.push({
      'name': cat.name,
      'supercat_id': cat.supercat_id,
      'cat_id': cat.cat_id,
      'div': $('<div class="div-icon"><div class="caption"><p>cat.name</p></div><img class="icon" src=' + img_src + '></img></div>'),
      'div1': $('<div class="div-icon-selected"><img class="icon-selected" src=' + img_src + '></img></div>'),
      'isselected': 0,
      'panel_idx': -1,
      'x': 0,
      'y': 0,
      'drag_time': 0,

    });
    icons_all = icons;
  }

  // =====================================================================
  // prepare for interactive icon panel
  // icons_all[j], i: images, j: icons
  //for (var i = 0; i < im_urls.length; i++) {
  for (var j = 0; j < icons.length; j++) {
    icons_all[j]['div'].data('idx', j);
    icons_all[j]['div1'].data('idx', j);
    icons_all[j]['div'].data('img_idx', 1);
    icons_all[j]['div1'].data('img_idx', 1);
    // ===============================================================
    // ==================== Set draggable =============================
    // ===============================================================
    icons_all[j]['div'].draggable({
      cursor: "move",
      start: function (ev) {
        var i = $(this).data('img_idx');
        var idx = $(this).data('idx');
        var isselected = icons_all[idx]['isselected'];
        if (isselected === 0) {
          $(this).find('p').html('');
        }
        $(this).data('clientX', ev.clientX);
        $(this).data('clientY', ev.clientY);
        $(this).data('drag_start_time', ev.timeStamp);
        if ($(this).css('position') === 'absolute') {
          var top = $(document).scrollTop() + ev.clientY - 20;
          var left = $(document).scrollLeft() + ev.clientX - 20;
          $(this).css('top', top);
          $(this).css('left', left);
        }
      },
      stop: function (ev) {
        var i = $(this).data('img_idx');
        var idx = $(this).data('idx');
        var isselected = icons_all[idx]['isselected'];
        // =========== check if it's drop in image ==========
        var im_y = parseFloat($('#imdiv').find('.image-task').position().top);
        var im_x = parseFloat($('#imdiv').find('.image-task').position().left);
        var im_w = parseFloat($('#imdiv').find('.image-task').css('width'));
        var im_h = parseFloat($('#imdiv').find('.image-task').css('height'));
        var icon_x = ($(this).position().left + 20.0 - im_x) / im_w;
        var icon_y = ($(this).position().top + 20.0 - im_y) / im_h;
        icons_all[idx]['drag_time'] += -$(this).data('drag_start_time') + ev.timeStamp;
        if (icon_x < -0.01 || icon_x > 1.01 || icon_y < -0.01 || icon_y > 1.01) {
          if (isselected === 1) {
            $(this).trigger('click');   // equal to de-select the icon
          } else {
            $(this).css('left', 0);     // go back to their original position
            $(this).css('top', 0);
            $(this).find('p').html(icons_all[idx]['name']);
          }
          return -1;
        }
        $(this).data('drag_start_time');

        if (isselected === 0) {
          icons_all[idx]['div1'].appendTo($('#cats_icons'));
          icons_all[idx]['div'].css('border-color', 'green');
          $(this).find('.caption').find('p').css('color', 'green');
          icons_all[idx]['div1'].css('border-color', 'green');
          icons_all[idx]['isselected'] = 1;
          // change the content
          $(this).find('p').html('');
          $(this).css('width', '25px');
          $(this).css('height', '25px');
          $(this).find('img').css('width', '25px');
          $(this).find('img').css('height', '25px');
          // change the dom structure
          $(this).detach();
          $(this).appendTo('#imdiv' + i);
          var top = $(document).scrollTop() + ev.clientY - 20;
          var left = $(document).scrollLeft() + ev.clientX - 20;
          $(this).css('top', top);
          $(this).css('left', left);
          $(this).css('position', 'absolute');
        }
        // save position at the end of the drag
        icons_all[idx]['x'] = ($(this).position().left - im_x) / im_w;
        icons_all[idx]['y'] = ($(this).position().top - im_y) / im_h;

      }
    });
  }
  //}

  // initialize UI
  initialize_anncats();

});
