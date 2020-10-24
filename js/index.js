$(function(){
    fetchShuushiData();
    fetchGesshoZandaka();
    fetchGetsumatsuZandaka();
    // test();
});

let test = function(){
    // テーブルとボタン表示
    $('#main_table').removeClass('hidden');
    $('.btn-add-shuushi').removeClass('hidden');
    $('.area-zandaka-start').removeClass('hidden');
    $('.area-zandaka-end').removeClass('hidden');
}

// 月初残高取得
let fetchGesshoZandaka = function() {
    google.script.run
    .withSuccessHandler( data => {
        // 取得成功
        let tableData = JSON.parse(data);

        // データセット
        $('.area-zandaka-start').find('.zandaka-kingaku').text(tableData[0].kingaku);
        // データ表示
        $('.area-zandaka-start').removeClass('hidden');

    })
    .withFailureHandler( data => {
        // 取得失敗
        console.log('取得失敗:' + data);
    })
    .getTableData("月初残高");

}
// 月末予測残高取得
let fetchGetsumatsuZandaka = function() {
    google.script.run
    .withSuccessHandler( data => {
        // 取得成功
        let tableData = JSON.parse(data);

        // データセット
        $('.area-zandaka-end').find('.zandaka-kingaku').text(tableData[0].kingaku);
        // データ表示
        $('.area-zandaka-end').removeClass('hidden');

    })
    .withFailureHandler( data => {
        // 取得失敗
        console.log('取得失敗:' + data);
    })
    .getTableData("予測月末残高");

}

// 収支データ取得
let fetchShuushiData = function() {
    google.script.run
    .withSuccessHandler( data => {
        // 取得成功
        let tableData = JSON.parse(data);

        renderTable(tableData);

        // テーブルとボタン表示
        $('#main_table').removeClass('hidden');
        $('.btn-add-shuushi').removeClass('hidden');

    })
    .withFailureHandler( data => {
        // 取得失敗
        console.log('取得失敗:' + data);
    })
    .getTableData("収支");
}

let renderTable = function (data) {

    let $table = $('#main_table');

    // テーブル初期化
    $table.empty();

    // ヘッダ部出力
    let th = '<thead>';
    th += '<tr>';
    for(let key in data[0] ) {
        th += '<th>' + key + '</th>';
    }
    th += '</tr>';
    th += '</thead>';
    $table.append(th);

    // データ部出力
    let tbody = '<tbody>';
    data.forEach( dataRow => {
        tbody += '<tr>';
        for(let key in dataRow) {
            tbody += '<td>' + dataRow[key] + '</td>';
        }
        tbody += '</tr>';
    });
    tbody += '</tbody>';

    $table.append(tbody);
}
