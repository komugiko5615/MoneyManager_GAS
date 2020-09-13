$(function(){
    $('#search').on('click', function() {
        google.script.run
            .withSuccessHandler( data => {
                // 取得成功
                console.log('取得成功：' + data);
                let tableData = JSON.parse(data);

                renderTable(tableData);

            })
            .withFailureHandler( data => {
                // 取得失敗
                console.log('取得失敗:' + data);
            })
            .getMoneyData();
    });
});

let renderTable = function (data) {
    let element = $('#main_table');

    const kouzaData = data["口座マスター"];

    // テーブル初期化
    element.empty();

    // ヘッダ部出力
    let th = '<thead>';
    th += '<tr>';
    for(let key in kouzaData[0] ) {
        th += '<th>' + key + '</th>';
    }
    th += '</tr>';
    th += '</thead>';
    element.append(th);

    // データ部出力
    let tbody = '<tbody>';
    kouzaData.forEach( dataRow => {
        tbody += '<tr>';
        for(let key in dataRow) {
            tbody += '<td>' + dataRow[key] + '</td>';
        }
        tbody += '</tr>';
    });
    tbody += '</tbody>';

    element.append(tbody);
}