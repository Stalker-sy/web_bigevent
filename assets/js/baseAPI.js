// 所有的ajax在发送到服务器之前
// 过滤器
$.ajaxPrefilter(function (options) {
    if (options.url.startsWith('/my')) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
        options.complete = function (res) {
            if (res.responseJSON.status != 0) {
                // 只要出问题了,直接跳转回登录页面
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    }
    // 对原始写的url参数进行二次加工
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})