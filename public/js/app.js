function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function(){
  // 优先使用强制设置的语言
  var forceLang = getParameterByName('force')
  if (!forceLang) {
    // 其次才简单的检测一下语言
    if (window.navigator.language && window.navigator.language.match('zh')) {
      if (currentLang !== 'zh_cn') {
        window.location.href = '/'
      }
    } else {
      if (currentLang !== 'en') {
        window.location.href = '/en'
      }
    }
  }

  var lang = {
    'en': {
      'form.name.required': 'Can\'t be empty',
      'form.email.required': 'Can\'t be empty',
      'form.email.email': 'Email is wrong',
      'form.demand.required': 'Can\'t be empty',
      'success': 'Congratulations you submit success !',
      'error.company-email-required': 'Please use the company email !!',
      'error.network': 'Network error, please try again !!'
    },
    'zh_cn': {
      'form.name.required': '不能为空',
      'form.email.required': '不能为空',
      'form.email.email': '输入邮箱有误',
      'form.demand.required': '不能为空',
      'success': '恭喜您提交成功！',
      'error.company-email-required': '请使用公司邮箱!!',
      'error.network': '网络错误，请重试！！'
    }
  };
  // 多语言翻译
  function i18n(key) {
    return lang[currentLang][key];
  }

  $('.banner-text').show();
  window.scrollReveal = new scrollReveal({reset: false,mobile: true, easing:'ease'});

  $('.carousel').carousel();

  $('.navbar-toggle').click(function(){
    if ($('.collapse').is(':hidden')) {
        $('.collapse').slideDown();
    }else{
        $('.collapse').slideUp();
    }
  });

  $('.navbar-nav li a').click(function(){
    $('.collapse').slideUp();
    return false;
  });

  // 验证表单
  $('#form').validate({
          rules:{
              name: {
                  required:true,
              },
              email: {
                  required:true,
                  email:true
              },
              demand: {
                  required:true,
              }

          },
        messages :{
              name: {
                  required: i18n('form.name.required'),
              },
              email: {
                  required: i18n('form.email.required'),
                  email: i18n('form.email.email')
              },
              demand: {
                  required: i18n('form.demand.required'),
              }

        }
  })

  $(".input-file").on("change","input[type='file']",function(){
      var filePath =$(this).val();
      var arr=filePath.split('\\');
      var fileName=arr[arr.length-1];
      $(".info-file").html(fileName);
  })

  $('.sub-btn').click(function(){
      var formData = new FormData($('input[textarea="demand"]')[0]);
      if($("#form").valid()){
          var form = new FormData(document.getElementById("form"));
          $.ajax({
              url:"email",
              type:"post",
              data:form,
              cache: false,
              processData: false,
              contentType: false,
              beforeSend:function(){
                  layer.load(2);
              },
              success:function(data){
                  if (data.code ==2) {
                      layer.msg(i18n('error.company-email-required'));
                  }else if(data.code ==1){
                      layer.msg(i18n('success'));
                  }

              },
              error:function(e){
                layer.msg(i18n('error.network'));
              },
              complete:function(){
                  layer.closeAll('loading');
              }
          });
      }
  })

  // 导航
  $('.nav').onePageNav();
  $(window).scroll(function(e){
    if ($(window).scrollTop()>$('.banner-wrap').height()-2) {
        $('.navbar').addClass('nav-wrap-bottom')
    }else if($(window).scrollTop()<$('.banner-wrap').height()){
        $('.navbar').removeClass('nav-wrap-bottom');
    }

  })

  // 轮流显示 title1 和 title2
  var $title1 = $('#serve-title-1');
  var $title2 = $('#serve-title-2');
  var during = 3000;
  $title2.hide()
  function title1In () {
    $title2.fadeOut(500, function () {
      $title1.fadeIn(500, function () {
        setTimeout(function () {
          title2In()
        }, during)
      })
    })
  }
  function title2In () {
    $title1.fadeOut(500, function () {
      $title2.fadeIn(500, function () {
        setTimeout(function () {
          title1In()
        }, during)
      })
    })
  }
  title1In()
});