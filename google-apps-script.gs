// Google Apps Script for Feedback Form
// Deploy this as a Web App in Google Sheets

function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Username',
        'Satisfaction Rating',
        'Games Played',
        'Game Issues',
        'Payment Issues',
        'Live Chat Improvement',
        'Feature Requests',
        'Additional Feedback'
      ]);
      
      // Format headers
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setBackground('#ff9500');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // Prepare the row data
    var timestamp = new Date();
    var username = data.username || '';
    var satisfaction = data.satisfaction || '';
    var games = Array.isArray(data.games) ? data.games.join(', ') : '';
    var gameIssues = data.gameIssues || '';
    var paymentIssues = data.paymentIssues || '';
    var liveChatImprovement = data.liveChatImprovement || '';
    var featureRequests = data.featureRequests || '';
    var additionalFeedback = data.additionalFeedback || '';
    
    // Append the new row
    sheet.appendRow([
      timestamp,
      username,
      satisfaction,
      games,
      gameIssues,
      paymentIssues,
      liveChatImprovement,
      featureRequests,
      additionalFeedback
    ]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 9);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Feedback submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Google Apps Script is working! Use POST to submit data.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
