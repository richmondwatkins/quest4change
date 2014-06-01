(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    get();
    $('#profile-wrapper').hide();
    $('body').on('click', '#profile', slideOut);
  }

  function get() {
      var url = 'http://data.nashville.gov/resource/dqkw-tj5j.json';
      $.getJSON(url, data=>{
        console.log(data);
    });
  }

  function slideOut(){
    // var $lefty = $('#profile-wrapper');
    // $lefty.animate({
    //   left: parseInt($lefty.css('left'),10) == 0 ?
    //     -$lefty.outerWidth() :
    //     0
    // });
    $('#map-filter').fadeToggle();
    $('#profile-wrapper').fadeToggle();
  }


})();
