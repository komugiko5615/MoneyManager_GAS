// SS_MoneyManager
const SS_MONEY_MANAGER = {
    ID: "1LkalUY2sakcytC-JcU_ZpSTpybct-Q6Y1fZwolAt3RI",
}

// 収支
const TABLE_SHUUSHI = {
    name: "収支",
    col_key: [
        "shuushi_id",
        "kouza_id",
        "date",
        "shuushi_name",
        "shuushi_type",
        "kingaku",
    ],
    insert: function(data) {
        const ss = SpreadsheetApp.openById(SS_MONEY_MANAGER.ID);
        const sheet = ss.getSheetByName(this.name);
        const lastRow = sheet.getLastRow();
        let rowIndex = lastRow;
        data.forEach(record => {
            let colIndex = 1;
            for(let i in this.col_key){
                // スプレッドシートに書き込む
                sheet.getRange(rowIndex, colIndex).setValue(record[this.col_key[i]]);
                colIndex++;
            }
            rowIndex++;
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
