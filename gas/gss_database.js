// T_MoneyManager
const SS_ID = "1LkalUY2sakcytC-JcU_ZpSTpybct-Q6Y1fZwolAt3RI";
const TABLE_NAME_LIST = [
    "月初残高",
    "口座マスター",
    "収支",
    "予測月末残高",
];

function test() {

    // 新規スプレッドシート作成
    const ss = SpreadsheetApp.create("test");

    TABLE_NAME_LIST.forEach(tableName => {
        // テーブルデータ取得
        let data = getTableData(tableName);
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

function getTableData(sheetName) {
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName(sheetName);
    // シート内の全データ取得
    let data = sheet.getDataRange().getValues();
    // カラム名とデータを分ける
    let keyList = data.shift();

    let gesshoZandaka = [];
    gesshoZandaka = data.map(rowData => {
        let record = {};
        // let record = [];
        keyList.forEach( (colName, index) => {
            record[colName] = rowData[index];
            // record[index] = rowData[index];
        });
        return record;
    });

    return gesshoZandaka;
}

function getColumnName(sheetName) {
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName(sheetName);

    const lastCol = sheet.getLastColumn();
    const keys = sheet.getRange(1,1,1,lastCol).getValues();

    return keys[0];
}