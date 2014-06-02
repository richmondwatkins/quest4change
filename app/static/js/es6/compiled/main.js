(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    get();
    $('#profile-wrapper').hide();
    $('body').on('click', '#profile', slideOut);
  }
  function get() {
    var url = 'http://data.nashville.gov/resource/dqkw-tj5j.json';
    $.getJSON(url, (function(data) {
      console.log(data);
    }));
  }
  function slideOut() {
    $('#map-filter').fadeToggle();
    $('#profile-wrapper').fadeToggle();
  }
})();

//# sourceMappingURL=main.map
