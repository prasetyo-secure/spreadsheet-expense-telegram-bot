var token = "[your token]";
var telegramUrl = "https://api.telegram.org/bot"+token;
var webAppUrl = "[your web app url]";
var ssId = "[your spreadsheet id]";

function getMe() {
    var url = telegramUrl+"/getMe";
    var response = UrlFetchApp.fetch(url);
    Logger.log(response.getContentText());
}

function setWebhook() {
    var url = telegramUrl+"/setWebhook?url="+webAppUrl;
    var response = UrlFetchApp.fetch(url);
    Logger.log(response.getContentText());
}

function sendText(id,text) {
    var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
    var response = UrlFetchApp.fetch(url);
    Logger.log(response.getContentText());
}

function doGet(e) {
    return HtmlService.createHtmlOutput("Hi There");
}

function doPost(e) {
    var data = JSON.parse(e.postData.contents);
    var text = data.message.text;
    var id = data.message.chat.id;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();

    switch(month) {
      case 0 :
        month = "Januari";
        break;
      case 1 :
        month = "Februari";
        break;
      case 2 :
        month = "Maret";
        break;
      case 3 :
        month = "April";
        break;
      case 4 :
        month = "Mei";
        break;
      case 5 :
        month = "Juni";
        break;
      case 6 :
        month = "Juli";
        break;
      case 7 :
        month = "Agustus";
        break;
      case 8 :
        month = "September";
        break;
      case 9 :
        month = "Oktober";
        break;
      case 10 :
        month = "November";
        break;
      case 11 :
        month = "Desember";
        break;
    }

    var currentDate = date + " " + month + " " + year;
    var comment = text.split("-");
    var commentLength = comment.length;

    if (commentLength == 3) {
      var sheetName = comment[0];
      var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName) ? SpreadsheetApp.openById(ssId).getSheetByName(sheetName) : SpreadsheetApp.openById(ssId).insertSheet(sheetName);
      var nominal = comment[1];
      var description = comment[2];
      sheet.appendRow([currentDate,nominal,description]);
      var response = "Laporan tercatat, pada "+ currentDate + " sebanyak " + nominal + " telah digunakan untuk " + description
    } else {
      var response = "Laporan tidak tercatat, ada kesalahan!"
    }
    sendText(id, response);
}