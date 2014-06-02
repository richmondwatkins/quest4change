(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#new-group').click(makeGroup);
    $('.group-cat').hide();
    $('#show-createdgroup-cat').click(showCreatedGroups);
    $('#show-mygroup-cat').click(showMyGroups);
    $('#show-allgroup-cat').click(showAllGroups);
  }
  function showAllGroups() {
    $('#all-groups').slideToggle();
  }
  function showMyGroups() {
    $('#mygroups').slideToggle();
  }
  function showCreatedGroups() {
    $('#createdgroups').slideToggle();
  }
  function makeGroup() {
    ajax('/groups/new', 'get', null, (function(html) {
      $('#new-group-form').empty().append(html);
    }));
  }
  function ajax(url, type) {
    var data = arguments[2] !== (void 0) ? arguments[2] : {};
    var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
      return console.log(r);
    });
    var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
    $.ajax({
      url: url,
      type: type,
      dataType: dataType,
      data: data,
      success: success
    });
  }
})();

//# sourceMappingURL=groups.map
