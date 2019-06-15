

$(function(){
  var currentPage = 1;
  var pageSize = 4;

  render();
  function render(){
    
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page:currentPage,
      pageSize:pageSize,
    },
    success:function(info){
      var htmlStr =template("usertpl",info);
      $('.lt_content tbody').html(htmlStr);
   
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        totalPages: Math.ceil(info.total / info.size),
        currentPage: info.page,
        onPageClicked: function(a,b,c,page){
          
          currentPage = page;
          render();
        }

      })
      
    }
  })

  }
})

