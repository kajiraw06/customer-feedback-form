// Rating slider interaction
const satisfactionSlider = document.getElementById('satisfaction');
const ratingValue = document.getElementById('ratingValue');

satisfactionSlider.addEventListener('input', (e) => {
    ratingValue.textContent = e.target.value;
});

// Captcha functionality
let captchaCode = '';

function generateCaptcha() {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Generate random 4-digit code
    captchaCode = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Set background with slight gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f5f5f5');
    gradient.addColorStop(1, '#e8e8e8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add noise lines
    for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = `rgba(200, 200, 200, ${Math.random() * 0.5 + 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
    
    // Draw captcha text
    ctx.font = 'bold 36px Arial';
    ctx.textBaseline = 'middle';
    
    const startX = 20;
    const y = canvas.height / 2;
    
    for (let i = 0; i < captchaCode.length; i++) {
        const char = captchaCode[i];
        const x = startX + (i * 35);
        
        // Random rotation for each character
        const rotation = (Math.random() - 0.5) * 0.4;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        // Character shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillText(char, 2, 2);
        
        // Character color (red similar to the example)
        ctx.fillStyle = '#e63946';
        ctx.fillText(char, 0, 0);
        
        ctx.restore();
    }
}

// Initialize captcha on page load
document.addEventListener('DOMContentLoaded', () => {
    generateCaptcha();
});

// Refresh captcha button
document.getElementById('refreshCaptcha').addEventListener('click', () => {
    generateCaptcha();
    document.getElementById('captchaInput').value = '';
    document.getElementById('captchaError').style.display = 'none';
});

// Character count for textareas
const textareas = [
    { id: 'gameIssues', countId: 'gameIssuesCount', maxLength: 500 },
    { id: 'paymentIssues', countId: 'paymentIssuesCount', maxLength: 500 },
    { id: 'liveChatImprovement', countId: 'liveChatCount', maxLength: 500 },
    { id: 'featureRequests', countId: 'featureRequestsCount', maxLength: 500 },
    { id: 'additionalFeedback', countId: 'additionalFeedbackCount', maxLength: 500 }
];

textareas.forEach(({ id, countId, maxLength }) => {
    const textarea = document.getElementById(id);
    const counter = document.getElementById(countId);
    
    textarea.setAttribute('maxlength', maxLength);
    
    textarea.addEventListener('input', (e) => {
        const length = e.target.value.length;
        counter.textContent = length;
        
        if (length >= maxLength) {
            counter.style.color = 'var(--error-color)';
        } else {
            counter.style.color = 'var(--text-secondary)';
        }
    });
});

// Form validation and submission
const form = document.getElementById('feedbackForm');
const gamesError = document.getElementById('gamesError');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate at least one game is selected
    const gamesCheckboxes = document.querySelectorAll('input[name="games"]:checked');
    
    if (gamesCheckboxes.length === 0) {
        gamesError.textContent = 'Please select at least one game type';
        gamesError.style.display = 'block';
        
        // Scroll to error
        gamesError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    } else {
        gamesError.textContent = '';
        gamesError.style.display = 'none';
    }
    
    // Validate captcha
    const captchaInput = document.getElementById('captchaInput').value;
    const captchaError = document.getElementById('captchaError');
    
    if (captchaInput !== captchaCode) {
        captchaError.textContent = 'Incorrect verification code. Please try again.';
        captchaError.style.display = 'block';
        
        // Generate new captcha
        generateCaptcha();
        document.getElementById('captchaInput').value = '';
        
        // Scroll to error
        captchaError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    } else {
        captchaError.textContent = '';
        captchaError.style.display = 'none';
    }
    
    // Collect form data
    const formData = {
        username: document.getElementById('username').value,
        satisfaction: document.getElementById('satisfaction').value,
        games: Array.from(gamesCheckboxes).map(cb => cb.value),
        gameIssues: document.getElementById('gameIssues').value,
        paymentIssues: document.getElementById('paymentIssues').value,
        liveChatImprovement: document.getElementById('liveChatImprovement').value,
        featureRequests: document.getElementById('featureRequests').value,
        additionalFeedback: document.getElementById('additionalFeedback').value,
        timestamp: new Date().toISOString()
    };
    
    // Simulate form submission (replace with actual API call)
    console.log('Form Data:', formData);
    
    // For demonstration purposes, we'll show success message
    // In production, this would be in the .then() of your fetch/ajax call
    submitFeedback(formData);
});

function submitFeedback(formData) {
    // Disable submit button
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Replace this URL with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqvoF3CfCmXvuYcH5WF3AtHAr3DJYHARTBi-xRLnqrBQaH__6UxjNcg1-oRVWoGgL4/exec';
    
    // Send data to Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        // Note: no-cors mode doesn't return response, so we assume success
        // Hide form
        form.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'flex';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Reset form after delay
        setTimeout(() => {
            form.reset();
            ratingValue.textContent = '5';
            satisfactionSlider.value = '5';
            textareas.forEach(({ countId }) => {
                document.getElementById(countId).textContent = '0';
            });
            
            // Generate new captcha
            generateCaptcha();
            document.getElementById('captchaInput').value = '';
            
            // Re-enable and show form
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Feedback';
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your feedback. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Feedback';
    });
}

// Add smooth animation for checkbox interactions
document.querySelectorAll('.checkbox-label').forEach(label => {
    label.addEventListener('click', () => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        const custom = label.querySelector('.checkbox-custom');
        
        // Clear error when user interacts
        if (checkbox.checked || !checkbox.checked) {
            gamesError.textContent = '';
            gamesError.style.display = 'none';
        }
    });
});
