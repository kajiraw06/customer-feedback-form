# Customer Feedback Form

A modern, responsive feedback form for gaming websites with a beautiful dark theme design.

## Features

- **Username Input** - Required field for user identification
- **Satisfaction Rating** - Interactive 1-10 slider with real-time value display
- **Games Played** - Checkbox selection for Slots and Live Casino
- **Game Issues** - Textarea for reporting specific game problems
- **Payment Issues** - Textarea for deposit/withdrawal concerns
- **Live Chat Support** - Feedback on customer support improvements
- **Feature Requests** - Suggestions for new or improved features
- **Additional Feedback** - Open-ended feedback section

## Design Features

✨ **Modern Dark Theme** - Professional gaming aesthetic with gradient background
📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
✅ **Form Validation** - Client-side validation with helpful error messages
🎨 **Smooth Animations** - Polished interactions and transitions
📊 **Character Counters** - Real-time character count for all text areas (500 char limit)
🎯 **Interactive Elements** - Custom styled checkboxes and range slider
✉️ **Success Feedback** - Beautiful confirmation message after submission

## File Structure

```
feedback-form/
├── feedback-form.html    # Main HTML structure
├── styles.css           # Complete styling with dark theme
├── script.js            # Form validation and interactions
└── README.md           # Documentation
```

## How to Use

1. **Open the form**: Simply open `feedback-form.html` in a web browser
2. **Fill out the form**: Complete all required fields (marked with *)
3. **Submit**: Click the submit button to send your feedback

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;  /* Main accent color */
    --background: #0f172a;      /* Page background */
    --surface: #1e293b;         /* Form background */
    /* ... more colors */
}
```

### Backend Integration

Replace the `submitFeedback()` function in `script.js` with your actual API endpoint:

```javascript
fetch('/api/submit-feedback', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    // Handle success
})
.catch(error => {
    // Handle error
});
```

## Form Data Structure

When submitted, the form collects the following data:

```javascript
{
    username: "string",
    satisfaction: "1-10",
    games: ["slots", "live-casino"],
    gameIssues: "string",
    paymentIssues: "string",
    liveChatImprovement: "string",
    featureRequests: "string",
    additionalFeedback: "string",
    timestamp: "ISO date string"
}
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Free to use for your gaming website projects.
