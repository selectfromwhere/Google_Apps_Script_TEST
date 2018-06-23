// ---------------------------------- //
//  Triggerの作成
// ---------------------------------- //
function setTrigger() {
  ScriptApp.newTrigger('sendMail')
    .timeBased()
    // .everyHours(1)      // 1時間おき
    .everyMinutes(1)    // 1分おき
    .create();
}


// ---------------------------------- //
//  Emailの送信
// ---------------------------------- //
function sendMail() {
  var email = Session.getActiveUser().getEmail();   // 自分のアカウントのEmailアドレスを取得
  var subject = 'テストスクリプト';
  var body = '送信成功';
  GmailApp.sendEmail(email, subject, body);
}


// ---------------------------------- //
// 全トリガーの削除
// ---------------------------------- //
function deleteTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}


// ---------------------------------- //
// スプレットシートの作成
// ---------------------------------- //
function createSpreadsheet() {
  var sheet = SpreadsheetApp.create("GASテスト");
  Logger.log(sheet.getUrl());
}


// ---------------------------------- //
// スプレットシートに入力
// ---------------------------------- //
function inputSpreadsheet() {
  var spreadsheet = SpreadsheetApp.openById('1y5gWuBeIfNPWpyYsZBzb3A5ybkeQy6KKzFP7c72hZMo');
  var sheet = spreadsheet.getActiveSheet();
  for (var i = 1; i <= 6; i++) {
    sheet.getRange(i, 1).setValue(i + '. テスト');
  }
}


// ---------------------------------- //
// 天気情報の取得
// ---------------------------------- //
function weatherForecast() {
  var response = UrlFetchApp.fetch("https://map.yahooapis.jp/weather/V1/place?coordinates=139.873631,35.673587&appid=dj00aiZpPTlaTFdxNkxVN0JNdyZzPWNvbnN1bWVyc2VjcmV0Jng9YmM-&output=json");
  var json_res = JSON.parse(response.getContentText());
  var items = json_res['Feature'][0]['Property']['WeatherList']['Weather'];
  var spreadsheet = SpreadsheetApp.openById('1y5gWuBeIfNPWpyYsZBzb3A5ybkeQy6KKzFP7c72hZMo');
  var sheet = spreadsheet.getActiveSheet();
  for (var i = 1; i <= 7; i++) {
    sheet.getRange(i, 1).setValue(items[i-1]['Date']);
    sheet.getRange(i, 2).setValue(items[i-1]['Rainfall']);
  }
}