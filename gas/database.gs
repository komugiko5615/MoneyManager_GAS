// T_MoneyManager
const SS_ID = "1LkalUY2sakcytC-JcU_ZpSTpybct-Q6Y1fZwolAt3RI";
const TABLE_NAME_LIST = [
    "月初残高",
    "口座マスター",
    "収支",
    "予測月末残高",
];

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