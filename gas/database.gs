// SS_MoneyManager
const SS_MONEY_MANAGER = {
    ID: "1LkalUY2sakcytC-JcU_ZpSTpybct-Q6Y1fZwolAt3RI",
}

// 月初残高
const TABLE_GESSHO_ZANDAKA = {
    name: "月初残高",
    col_key: [
        "収支ID",
        "口座ID",
        "日付",
        "収支名",
        "収支分類",
        "金額",
    ],
    insert: function(data) {
        const ss = SpreadsheetApp.openById(SS_MONEY_MANAGER.ID);
        const sheet = ss.getSheetByName(this.name);
        const lastRow = sheet.getLastRow();
        data.forEach(record => {
            let colIndex = 1;
            for(let key in record){
                // スプレッドシートに書き込む
                sheet.getRange(lastRow, colIndex).setValue(record[key]);
                colIndex++;
            }
        });
    },
}

function fetchTableData(sheetName) {
    const ss = SpreadsheetApp.openById(SS_MONEY_MANAGER.ID);
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
    const ss = SpreadsheetApp.openById(SS_MONEY_MANAGER.ID);
    const sheet = ss.getSheetByName(sheetName);

    const lastCol = sheet.getLastColumn();
    const keys = sheet.getRange(1,1,1,lastCol).getValues();

    return keys[0];
}
