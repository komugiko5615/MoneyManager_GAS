function doGet(e) {
    let action = e.parameter["action"];
    let template;
    if(!action) {
        template = "index";
    }
    else {
        switch(action) {
            case "index":
                template = "index";
                break;
            case "register":
                template = "register";
                break;
            default:
                template = "Error";
                break;
        }
    }
    return HtmlService.createTemplateFromFile(template).evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
    var params = JSON.parse(e.postData.getDataAsString());
    var value = params.value;

    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify({ message: "success!" }));
  
    return output;
}

function getMoneyData() {

    let moneyData = {};
    TABLE_NAME_LIST.forEach(tableName => {
        // テーブルデータ取得
        let data = fetchTableData(tableName);
        let keys = getColumnName(tableName);

        moneyData[tableName] = data;
    });

    return JSON.stringify(moneyData);
}

function getTableData(tableName) {

    // テーブルデータ取得
    const tableData = fetchTableData(tableName);

    return JSON.stringify(tableData);
}