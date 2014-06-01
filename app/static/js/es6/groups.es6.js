(function(){
  'use strict';
  $(document).ready(init);

  function init(){
    $('#new-group').click(makeGroup);
  }



  function makeGroup(){

    ajax('/groups/new', 'get', null, html=>{
      $('#all-groups').append(html);
    });

  }




  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}


})();
