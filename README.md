# 📊 Spreadsheet Telegram Bot

## Overview
This bot connects Telegram with Google Sheets using Google Apps Script. It allows you to send commands via Telegram and log data directly into a spreadsheet.

## Setup Instructions

1. **Create a Telegram Bot**  
   Use BotFather to create a bot and get your bot token.

2. **Prepare Google Spreadsheet**  
   Create a new Google Sheet and note its ID from the URL.

3. **Deploy Google Apps Script**  
   - Open Google Apps Script.
   - Paste the bot code.
   - Replace the following variables with your own:
     ```javascript
     var token = "[your telegram bot token]";
     var webAppUrl = "[your deployed web app URL]";
     var ssId = "[your spreadsheet ID]";
     ```
   - Deploy the script as a **Web App**:
     - Set access to **Anyone, even anonymous**.
     - Copy the Web App URL.

4. **Set Telegram Webhook**  
   Use this URL format to set the webhook:
   ```
   https://api.telegram.org/bot<your_token>/setWebhook?url=<your_webAppUrl>
   ```
