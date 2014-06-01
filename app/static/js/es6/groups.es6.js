(function(){
  'use strict';
  $(document).ready(init);

  function init(){
    $('#new-group').click(makeGroup);
    $('.group-cat').hide();
    $('#show-createdgroup-cat').click(showCreatedGroups);
    $('#show-mygroup-cat').click(showMyGroups);
    $('#show-allgroup-cat').click(showAllGroups);
  }

  function showAllGroups(){
    $('#all-groups').slideToggle();    
  }

  function showMyGroups(){
    $('#mygroups').slideToggle();
  }

  function showCreatedGroups(){
    $('#createdgroups').slideToggle();
  }

  function makeGroup(){

    ajax('/groups/new', 'get', null, html=>{
      $('#new-group-form').empty().append(html);
    });

  }


  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}


})();
