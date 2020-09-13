$(function(){
    $('#register_btn').on('click', function() {
        data[0].
        google.script.run
            .withSuccessHandler( result => {
                // 成功
                alert("登録完了")

            })
            .withFailureHandler( result => {
                // 失敗
                alert("登録失敗")
            })
            .insertShuushi(data);
    });
});