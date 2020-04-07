!function ($) {
    //1.登录事件触发
    $('.btn').on('click', function () {
        if ($('.user input').val() && $('.pass input').val()) {
            //1.将用户名和密码传给后端
            $.ajax({
                type: 'post',
                url: 'http://localhost/dangdang/php/login.php',
                data: {
                    username: $('.user input').val(),
                    password: $('.pass input').val()
                }
            }).done(function (d) {
                if (d) {
                    location.href = "../html/index1.html"
                    jscookie.add('username', $('.user input').val(), 10);
                } else {
                    alert('登录失败，用户名或者密码错误');
                }
            })
        } else {
            alert('用户名或者密码不能为空');
        }
    })

    //2.1用户名得到焦点
    $('.user input').on('focus', function () {
        $('fieldset .usertip').html('请输入邮箱/昵称/手机号码');
    })
    //2.2用户名失去焦点
    $('.user input').on('blur', function () {
        $('fieldset .usertip').html('');
    })
    //2.3密码得到焦点
    $('.pass input').on('focus', function () {
        $('fieldset .passtip').html('请输入密码');
    })
    //2.4密码失去焦点
    $('.pass input').on('blur', function () {
        $('fieldset .passtip').html('');
    })
}(jQuery);
