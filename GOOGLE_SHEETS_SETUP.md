# 📊 Google Sheets Integration Setup Guide

Follow these step-by-step instructions to connect your feedback form to Google Sheets.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it something like "Customer Feedback Form"
4. Leave the sheet empty - the script will automatically create headers

## Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. This will open the Apps Script editor in a new tab
3. Delete any existing code in the editor

## Step 3: Add the Script Code

1. Copy ALL the code from the file `google-apps-script.gs` in this project
2. Paste it into the Apps Script editor
3. Click the **💾 Save** icon (or Ctrl+S / Cmd+S)
4. Name your project (e.g., "Feedback Form Handler")

## Step 4: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the deployment settings:
   - **Description**: "Feedback Form API" (or any description)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (This is important!)
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **IMPORTANT**: Copy the **Web app URL** that appears
   - It will look like: `https://script.google.com/macros/s/AKfycby.../exec`
   - Save this URL - you'll need it in the next step!

## Step 5: Update Your Feedback Form

1. Open the file `script.js` in your project
2. Find this line near the top of the `submitFeedback()` function:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your actual Web App URL
4. Example:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
5. Save the file

## Step 6: Test Your Form

1. Open `feedback-form.html` in your browser (or refresh if already open)
2. Fill out the form with test data
3. Click **Submit Feedback**
4. Go back to your Google Sheet
5. You should see your test data appear in a new row! 🎉

## What the Google Sheet Will Look Like

| Timestamp | Username | Satisfaction Rating | Games Played | Game Issues | Payment Issues | Live Chat Improvement | Feature Requests | Additional Feedback |
|-----------|----------|---------------------|--------------|-------------|----------------|----------------------|------------------|---------------------|
| 2025-12-30 23:45:00 | player123 | 8 | slots, live-casino | None | Withdrawal took 2 days | Faster response time | Mobile app | Great site! |

## Troubleshooting

### Problem: Data not appearing in Google Sheet

**Solution 1**: Check the Web App URL
- Make sure you copied the entire URL including `/exec` at the end
- The URL should start with `https://script.google.com/macros/s/`

**Solution 2**: Check deployment settings
- In Apps Script, go to **Deploy** → **Manage deployments**
- Make sure "Who has access" is set to **Anyone**
- If you changed the script, click **Edit** → **New version** → **Deploy**

**Solution 3**: Check browser console
- Open browser Developer Tools (F12)
- Go to the Console tab
- Submit the form and check for any error messages

### Problem: "Authorization required" error

**Solution**: 
- Go back to Apps Script
- Click the **Run** button (play icon) at the top
- Complete the authorization process again
- Redeploy the web app

### Problem: CORS errors in console

**Solution**: This is normal! The script uses `mode: 'no-cors'` which is required for Google Apps Script. The form will still work even if you see CORS warnings.

## Updating the Form

If you make changes to the form fields:

1. Update the `google-apps-script.gs` file to match new fields
2. In Google Apps Script editor, paste the updated code
3. Save the script
4. Go to **Deploy** → **Manage deployments**
5. Click the **Edit** icon (pencil) on your deployment
6. Click **Deploy** to create a new version
7. The URL stays the same - no need to update `script.js`

## Security Notes

- The Web App URL is public, but only accepts POST requests with your specific data format
- Data is stored in your personal Google Sheet that only you can access
- You can change "Who has access" to "Anyone with link" for slightly more security
- For production use, consider adding authentication or rate limiting

## Advanced: Viewing Submission Logs

To see if submissions are working:

1. In Apps Script editor, click **Executions** (clock icon on left sidebar)
2. You'll see a log of all script executions
3. Click on any execution to see details and any errors

## Need Help?

- Check the [Google Apps Script documentation](https://developers.google.com/apps-script)
- Verify the script is properly deployed
- Test the URL directly in your browser (should show a success message)

---

**Congratulations!** Your feedback form is now connected to Google Sheets! 🎉
