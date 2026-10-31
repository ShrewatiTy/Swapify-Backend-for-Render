// Handle Form Submission for Adding a Notice
document.addEventListener("DOMContentLoaded", () => {
    const noticeForm = document.getElementById("noticeForm"); // Make sure your form HTML has this ID
    const noticesContainer = document.getElementById("noticesContainer"); // Make sure your display area has this ID

    // Function to render notices to the screen
    function displayNotices() {
        if (!noticesContainer) return;
        noticesContainer.innerHTML = "";
        
        // Retrieve notices from browser localStorage
        const storedNotices = JSON.parse(localStorage.getItem("swapify_notices")) || [];
        
        if (storedNotices.length === 0) {
            noticesContainer.innerHTML = "<p>No barter notices posted yet. Be the first!</p>";
            return;
        }

        storedNotices.forEach((notice, index) => {
            const card = document.createElement("div");
            card.className = "notice-card";
            card.innerHTML = `
                <h3>${escapeHTML(notice.title)}</h3>
                <p><strong>Offering:</strong> ${escapeHTML(notice.offering)}</p>
                <p><strong>Looking For:</strong> ${escapeHTML(notice.lookingFor)}</p>
                <p>${escapeHTML(notice.description)}</p>
                <button onclick="deleteNotice(${index})" class="delete-btn">Remove</button>
            `;
            noticesContainer.appendChild(card);
        });
    }

    // Handle posting a new notice
    if (noticeForm) {
        noticeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const title = document.getElementById("noticeTitle").value;
            const offering = document.getElementById("noticeOffering").value;
            const lookingFor = document.getElementById("noticeLookingFor").value;
            const description = document.getElementById("noticeDescription").value;

            const newNotice = { title, offering, lookingFor, description, date: new Date().toISOString() };

            const currentNotices = JSON.parse(localStorage.getItem("swapify_notices")) || [];
            currentNotices.push(newNotice);
            localStorage.setItem("swapify_notices", JSON.stringify(currentNotices));

            noticeForm.reset();
            displayNotices();
        });
    }

    // Global function to delete a notice
    window.deleteNotice = function(index) {
        const currentNotices = JSON.parse(localStorage.getItem("swapify_notices")) || [];
        currentNotices.splice(index, 1);
        localStorage.setItem("swapify_notices", JSON.stringify(currentNotices));
        displayNotices();
    };

    // Helper to prevent script injection attacks
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // Initial load execution
    displayNotices();
});
