$(function(){
    $('#register_btn').on('click', function() {
        let data = [];
        let i = 0;
        data[i] = {};
        data[i].shuushi_id = $('#shuushi_id').val();
        data[i].kouza_id = $('#kouza_id').val();
        data[i].date = $('#date').val();
        data[i].shuushi_name = $('#shuushi_name').val();
        data[i].shuushi_type = $('#shuushi_type').val();
        data[i].kingaku = $('#kingaku').val();

        console.log(data);

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