// T_MoneyManager
const SS_ID = "1LkalUY2sakcytC-JcU_ZpSTpybct-Q6Y1fZwolAt3RI";

function test() {
    // テーブルデータ取得
    let data = getTableData("月初残高");
    let keys = getColumnName("月初残高");

    // 新規スプレッドシート作成
    const ss = SpreadsheetApp.create("test");
    const sheet = ss.getActiveSheet();

    // カラム名を出力
    keys.forEach((key, colIndex) => {
        sheet.getRange(1, colIndex+1).setValue(key);
    });

    // データ出力
    let rowIndex = 2;
    data.forEach((row) => {
        row.forEach( (value, colIndex) => {
            sheet.getRange(rowIndex, colIndex+1).setValue(value);
        });
        rowIndex++;
    });

    Logger.log(data);
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
        let record = [];
        keyList.forEach( (colName, index) => {
            record[index] = rowData[index];
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