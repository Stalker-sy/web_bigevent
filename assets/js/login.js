$(function () {
    // 给去注册账号添加点击事件,点击的时候 登录容器隐藏 注册容器显示
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 给去登录添加点击
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    layui.form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: function (value) {
            /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
        },
        repwd: function (value) {
            if ($('.reg-box [name = "password"]').val() != value) {
                return '确认密码不一致'
            }
        }
    });
    //给注册表单添加提交事件
    $('#form_reg').submit(function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val()
        }, function (res) {
            if (res.status != 0) return layer.msg(res.message)
            layer.msg('注册成功')
            $('#link_login').click(); // 用js模拟跳转回登录表单
        })
    })
    //登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.post('/api/login', $(this).serialize(), function (res) {
            if (res.status != 0) return layer.msg(res.message)
            // 把凭证存到本地存储
            localStorage.setItem('token', res.token)
            // 跳转到后台首页
            location.href = '/index.html'
        })
    })
})
