$(function(){

  $("#form").bootstrapValidator(
    {
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
            }
          }
        }
      }
    }
  );

});