
function test() {
    const data = getMoneyData();

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


function run() {

  let yearMonth = inputYearMonth();

  let gesshoZandakaList = getGesshoZandakaList(yearMonth);
  let shuushiList = getShuushiList(yearMonth);

  let getsumatsuZandaka = getGetsumatsuZandaka(gesshoZandakaList, shuushiList);

  setGetsumatsuZandaka(getsumatsuZandaka);
  
}

function inputYearMonth() {
  return "202009"
}

function getGesshoZandakaList(yearMonth) {
  let gesshoZandakaList = [];

  // ダミーデータセット
  gesshoZandakaList[0] = {};
  gesshoZandakaList[0].kouza_id = 0;  // 財布
  gesshoZandakaList[0].date = yearMonth + "01";
  gesshoZandakaList[0].kingaku = 10000;

  gesshoZandakaList[1] = {};
  gesshoZandakaList[1].kouza_id = 1;  // 三井住友銀行
  gesshoZandakaList[1].date = yearMonth + "01";
  gesshoZandakaList[1].kingaku = 10000;

  return gesshoZandakaList;
}

function getShuushiList(yearMonth) {

  let shuushiList = [];

  // 収支データ取得
  // ダミーデータセット
  for(let i=0; i<5; i++) {
    shuushiList[i] = {};
    shuushiList[i].shuushi_id = i+1;
    shuushiList[i].kouza_id = 1;
    shuushiList[i].date = "2020091" + i;
    shuushiList[i].name = "test";
    shuushiList[i].shuushi_type = 1;
    shuushiList[i].kingaku = -1000;
  }

  return shuushiList;
}

function getGetsumatsuZandaka(gesshoZandaka, shuushiList) {

  // 初期値は月初残高
  const initData = gesshoZandaka.map(data => ({
    kouza_id: data.kouza_id,
    kingaku: data.kingaku,
  }));
  const getsumatsuZandaka = shuushiList.reduce((result, current) => {
    const element = result.find(value => value.kouza_id === current.kouza_id);
    if (element) {
      // 金額を合計に加算
      element.kingaku += current.kingaku;
    } else {
      // 初回は口座IDを設定する
      result.push({
        kouza_id: current.kouza_id,
        kingaku: current.kingaku,
      })
    }
    return result;
  }, initData);

  return getsumatsuZandaka;
} 

function setGetsumatsuZandaka(getsumatsuZandaka) {

  console.log(getsumatsuZandaka);

}