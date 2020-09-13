$(function(){
    $('#search').on('click', function() {
        google.script.run
            .withSuccessHandler( data => {
                // 取得成功
                let tableData = JSON.parse(data);

                renderTable(tableData);

            })
            .withFailureHandler( data => {
                // 取得失敗
                console.log('取得失敗:' + data);
            })
            .getTableData("収支");
    });
});

let renderTable = function (data) {

    let element = $('#main_table');

    // テーブル初期化
    element.empty();

    // ヘッダ部出力
    let th = '<thead>';
    th += '<tr>';
    for(let key in data[0] ) {
        th += '<th>' + key + '</th>';
    }
    th += '</tr>';
    th += '</thead>';
    element.append(th);

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

    element.append(tbody);
}