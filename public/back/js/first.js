

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

  //点击添加分类按钮,显示模态框
  $('.addBtn').click(function(){
    $('#addModal').modal("show");
   
    
  });

  //使用表单校验插件,实现表单校验
  $('#form').bootstrapValidator({
     //配置校验图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', //校验成功
      invalid: 'glyphicon glyphicon-remove', //校验失败
      validating: 'glyphicon glyphicon-refresh' //校验中 
    },
    fields:{
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类不能为空"
          }
        }
      }
    }

  });

  //注册表单校验成功事件,阻止默认的成功提交,通过ajax进行提交

  $('#form').on("success.form.bv",function(e){
    //通过ajax进行提交
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function(info){
        console.log(info);
        if (info.success){
          $('#addModal').modal("hide");
          currentPage = 1;
          render();
          $('#form').data("bootstrapValidator").resetForm(ture);
        }
      }
    })
  })


})

