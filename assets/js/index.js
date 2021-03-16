function renderAvatar(userInfo) {
    var name;
    if (userInfo.nickname) {
        name = userInfo.nickname;
    } else {
        name = userInfo.username;
    }
    $('#welcome').html('欢迎' + name);
    if (userInfo.user_pic) {
        $('.userinfo .layui-nav-img').attr('src', userInfo.user_pic)
        $('.userinfo .text-avatar').hide()
    } else {
        $('.userinfo .text-avatar').text(userInfo.username[0].toUpperCase())
        $('.userinfo .layui-nav-img').hide()
    }
}
function getUserInfo() {
    $.ajax({
        type: 'get',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) return layer.msg('获取用户信息失败')
            renderAvatar(res.data)
        },
        // 不管成功还是失败 都会执行  在这里面写错误判断是最保险
        complete: function (res) {
            if (res.responseJSON.status != 0) {
                // 只要出问题了,直接跳转回登录页面
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
}
getUserInfo()

// 实现退出功能
$('#logout').click(function () {
    layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
        //销毁凭证
        localStorage.removeItem('token')
        //跳转回登录项
        location.href = '/login.html'
        layer.close(index);
    });
})