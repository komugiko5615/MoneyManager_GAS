
function test() {
    let data = [];
    for(let i in [0, 1]) {
        data[i] = {
            shuushi_id: 100 + i,
            kouza_id: 101,
            date: '20200902',
            shuushi_name: 'test',
            shuushi_type: 5,
            kingaku: 10000,
        };
    }

    TABLE_GESSHO_ZANDAKA.insert(data);

    Logger.log(data);
}
function outputMoneyDataToSS_TEST() {

    // 新規スプレッドシート作成
    const ss = SpreadsheetApp.create("test");

    TABLE_NAME_LIST.forEach(tableName => {
        // テーブルデータ取得
        let data = fetchTableData(tableName);
        let keys = getColumnName(tableName);

        let sheet = ss.getSheetByName("シート1");
        if(sheet) {
            sheet.setName(tableName);
        } else {
            sheet = ss.insertSheet(tableName);
        }

        // カラム名を出力
        keys.forEach((key, colIndex) => {
            sheet.getRange(1, colIndex + 1).setValue(key);
        });

        // データ出力
        let rowIndex = 2;
        data.forEach( record => {
            // row.forEach( (value, colIndex) => {
            //     sheet.getRange(rowIndex, colIndex+1).setValue(value);
            // });
            let colIndex = 1;
            for(key in record) {
                sheet.getRange(rowIndex, colIndex).setValue(record[key]);
                colIndex++;
            }
            rowIndex++;
        });

        Logger.log(data);
    });
}
