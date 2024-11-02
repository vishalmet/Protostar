function showIframePopup() {
    const iframePopup = document.getElementById('iframePopup');
    iframePopup.style.display = 'block';
}

// Function to close popup
document.getElementById('closePopupIframeBtn').addEventListener('click', function() {
    const iframePopup = document.getElementById('iframePopup');
    iframePopup.style.display = 'none';
});
