$(function(){

  // 进行表单校验配置
  $("#form").bootstrapValidator(
    {
      //配置校验图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok', //校验成功
        invalid: 'glyphicon glyphicon-remove', //校验失败
        validating: 'glyphicon glyphicon-refresh' //校验中 
      },
  
      //配置的字段和input 框中制定的name关联，所以必须要给input加上name
      fields:{
        username: {
          // 配置校验规则
          validators: {
            //非空
          notEmpty: {
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在2-6位",
          },
          callback: {
            message: "用户名不存在"
          }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "密码不能为空"
            },
            stringLength: {
              min: 6,
              max: 12,
              message: "密码长度必须是6-12位"
            },
            callback: {
              message: "密码错误"
            }
          }
        }
      }
    }
  );


  //登录功能
  // 在提交表单时进行校验

  $('#form').on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "employee/emptoyeeLogin",
      data: $("#form").serialize(),
      dataType: "json",
      success: function( info){
        if (info.success){
          location.href = "index.html";
        }
        if (info.error === 1000){
          //用户名不存在
          //校验状态  VALID  INVALID  NOT_VALIDATED 未校验的  VALIDATING校验中的
          $('form').data("bootstrapValidator").updateStatus("username","INvalid",'callback');
        }
        if (info.error === 1001){
          //密码错误
          $('form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }

    })
  })

  //重置功能
$('[type="reset"]').click(function(){
  $('#form').data('bootstrapValidator').resetForm()
});   

});