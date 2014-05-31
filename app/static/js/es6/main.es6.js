(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    get();
  }



  function get() {
      var url = 'http://data.nashville.gov/resource/dqkw-tj5j.json';
      $.getJSON(url, data=>{
        console.log(data);
    });
  }


})();
