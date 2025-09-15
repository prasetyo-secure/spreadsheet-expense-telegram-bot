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

    // Split the message by spaces.
    var parts = text.split(" ");
    
    // Check if the message has exactly two parts.
    if (parts.length === 2) {
      // The first part is the amount.
      var amount = parts[0];
      // The second part is the description.
      var description = parts[1];

      // Get the current date and format it.
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth();
      var date = today.getDate();

      // Convert the month number to its name.
      var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      var currentMonth = monthNames[month];
      var currentDate = date + " " + currentMonth + " " + year;

      // Access the spreadsheet and the first sheet.
      // Make sure to replace "[your spreadsheet id]" with your actual spreadsheet ID.
      var sheet = SpreadsheetApp.openById(ssId).getSheets()[0];
      
      // Append the new row with the date, amount, and description.
      sheet.appendRow([currentDate, amount, description]);
      
      // Send a confirmation message back to the user.
      var response = "Note saved: " + amount + " has been used for " + description + " at " + currentDate;
      sendText(id, response);
    } else {
      // If the message format is incorrect, send an error message.
      var response = "Note unsaved. Make sure the format is correct: 'amount description'. Example: '200000 gas'";
      sendText(id, response);
    }
}
