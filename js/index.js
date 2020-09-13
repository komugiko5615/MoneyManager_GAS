$(function(){
    $('#search').on('click', function() {
        google.script.run
            .withSuccessHandler( data => {
                // 取得成功
                console.log('取得成功：' + JSON.parse(data));
            })
            .withFailureHandler( data => {
                // 取得失敗
                console.log('取得失敗:' + data);
            })
            .getMoneyData();
    });
});
