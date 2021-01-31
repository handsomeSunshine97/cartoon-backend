$.ajax({
    url: '/userInfo',
    type: 'get',
    success: ({ avatar, name, signature, username }) => {
        $('.username > span').text(username)
        !!avatar && $('.avatar > img').attr('src', avatar)
        !!name && $('.name > input').val(name)
        !!signature && $('.signature > textarea').text(signature)
        !!avatar && $('.layui-nav-item >a>img').attr('src',avatar)
    }
})

$("#userInfo").on('click', function () {
    $("#mask").show()
})

$(".primary").on('click', function () {
    let formData = new FormData($('#theForm')[0])
    let avatarUrl = $('.avatar > img').attr('src')
    formData.append('avatar', avatarUrl)
    $.ajax({
        type: 'post',
        url: '/editUserInfo',
        processData: false,
        contentType: false,
        data: formData,
        success(res) {
            if (res.statusCode === 0) {
                layer.msg('保存成功',{
                    time:1000,
                    end(){
                        $("#mask").hide()
                        $('.layui-nav-item >a>img').attr('src',$('.avatar img').attr('src'))
                    }
                })
            }
        }  
    })
})

$(".cancel").on('click', function () {
    $("#mask").hide()
})

$(".close").on('click', function () {
    $("#mask").hide()
})

$('input[type=file]').on('change', function () {
    let isUpload = this.files[0].size

    if (isUpload) {
        let formData = new FormData($('#theForm')[0])
        $.ajax({
            type: 'post',
            url: '/avatarUpload',
            processData: false,
            contentType: false,
            data: formData,
            success(res) {
                $('.avatar > img').attr('src', res.src)
            }
        })
    }
})

