
$(function(){
 
  var currentPage = 1;
  var pasgeSize = 5;
  var currentId;
  var isDelete;

  render();

  function render(){
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pasgeSize,
      },
      dataType: "json",
      success: function( info ){
        console.log(info);
       var htmlStr = template('tpl',info);
       $('tbody').html(htmlStr);
      

      $('#paginator').bootstrapPaginator({
        //配置bootstrap 版本
        bootstrapMajorVersion: 3,
        // 指定总页数
        totalPage: Math.ceil( info.total / info.size),
        //当前页
        currentPage: info.page,
  
        onPageClicked: function(a,b,c,page){
  
          currentPage = page;
          render();
        }
  
      });
    }
    });
  }

  $('tbody').on("click",".btn",function(){
    //显示模态框
    $('#userModal').modal("show");
    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    console.log(currentId);
    console.log(isDelete);

  });

   $('#submitBtn').click(function(){
    $.ajax( {
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete,
      },
      dataType: "json",
      success: function(){
        $('#userModal').modal("hide");
        render();
      }
    }
    )

   });
   

});