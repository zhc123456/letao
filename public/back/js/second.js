
$(function () {

  var currentPage = 1;
  var pageSize = 5;

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("secondTpl", info);
        $('.lt_content tbody').html(htmlStr);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total/ info.size),
          currentPage: info.page,
          onPageClicked: function(a,b,c,page){
            currentPage = page;
            render();
          }
          
        })
      }

    })

  }
 
  $('.addBtn').click(function(){
    $('#addModal').modal("show");
  
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function(info){
        var htmlStr = template("dropdownTpl",info);
        $('.dropdown-menu').html(htmlStr)
        
      }

    })

    
  })


  //通过事件委托给dropdwon-menu下的所有a绑定点击事件
  $('.dropdown-menu').on("click","a",function(){
    var txt = $(this).text();
    $('#dropdownTxt').text(txt);

    var id = $(this).data('id');
   
    $('[name="categoryId"]').val( id );
    $('#form').data("bootstrapValidator").updateStatus("categoryId","VALID");
  });

  //利用文件上传
  $('#fileupload').fileupload({
    //指定响应的数据格式
    dataType:"json",
    done:function(e,data){
      console.log(data);
      
      var imgUrl =  data.result.picAddr;
      $('#imgBox img' ).attr("src",imgUrl);
      $('[name="brandLogo"]').val(imgUrl);
    $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }


  })
  
  //表单校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //需要对隐藏域进行校验,所以不需要讲隐藏域排除到校验范围外
    excluded: [],
     //配置校验图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', //校验成功
      invalid: 'glyphicon glyphicon-remove', //校验失败
      validating: 'glyphicon glyphicon-refresh' //校验中 
    },
    fields: {
      // categoryId 分类id
      // brandName 二级分类名称
      // brandLogo 图片地址
      categoryId: {
        validators: {
          notEmpty: {
            message:"请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message:"请选择二级分类"
          }
        }
      },
      brandLogo:{
        validators: {
          notEmpty: {
            message:"请选择图片"
          }
        }
      },

    }

  })

  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $('form').serialize(),
      dataType: "json",
      success: function( info ){
        if (info.success){
           $('#addModal').modal("hide");
           currentPage = 1;
           render();
           $('#form').data("bootstrapValidator").resetForm("true");
           
           //重置文本内容和路径
           $('#dropdownTxt').text("请选择一级分类");
           $('#imgBox img').attr("src","images/none.png");
        }
      }
    })
  })


});