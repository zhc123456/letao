
//开启进度条

// NProgress.start();

//结束进度条
setTimeout(function(){
  
  NProgress.done();
},2000);

$(document).ajaxStart(function(){
  NProgress.start();
});

$(document).ajaxStop(function(){
  NProgress.done();
});
