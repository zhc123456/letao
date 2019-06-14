
//开启进度条

// NProgress.start();

//结束进度条
// setTimeout(function(){
  
//   NProgress.done();
// },2000);

$(document).ajaxStart(function(){
  NProgress.start();
});

$(document).ajaxStop(function(){
  NProgress.done();
},500);


//登录拦截

if ( location.href.indexOf("login.html") === -1 ){
$.ajax({
 type: "get",
 url: "/employee/checkRootLogin",
 dataType: "json",
 success: function( info ){
   if (info.success){

   }
   if ( info.error === 400){
     location.href = "login.html";
   }
 }
})
};


$('.nav .category').click(function(){
  $('.nav .child').slideToggle();

});

$('.icon_menu').click(function(){
  $('.lt_aside').toggleClass("hidemenu");
  $('.lt_topbar').toggleClass("hidemenu");
  $('.lt_main').toggleClass("hidemenu");
});


$('.icon_logout').click(function(){
  //显示模态框
  $('#logoutModal').modal('show');
})

//点击模态框的退出按钮实现退出功能
$('#logoutBtn').click(function(){
  $.ajax({
    type: "get",
    url: "employee-logout",
    success: function(info){
      if ( info.success){
        location.href = "login.html";
      }
    },

  })
})
