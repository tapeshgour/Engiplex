document.addEventListener('DOMContentLoaded', function() {
    const loginOverlay = document.getElementById('login-overlay');
    const loginButton = document.getElementById('login-button');
    const mainContent = document.getElementById('main-content');
    const showEnquiriesButton = document.getElementById('show-enquiries');
    const showApplicationsButton = document.getElementById('show-applications');
    const enquiriesSection = document.getElementById('enquiries-section');
    const applicationsSection = document.getElementById('applications-section');
    const logoutButton = document.getElementById('logout-button');
    
    const enquiriesTableBody = document.getElementById('enquiries-table-body');
    const applicationsTableBody = document.getElementById('applications-table-body');

    // Function to load and display enquiries from Firestore
    async function loadEnquiries() {
        enquiriesTableBody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
        const querySnapshot = await window.getDocs(window.collection(window.db, "enquiries"));
        enquiriesTableBody.innerHTML = '';
        if (querySnapshot.empty) {
            enquiriesTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No new enquiries found.</td></tr>';
            return;
        }
        querySnapshot.forEach((doc) => {
            const enquiry = doc.data();
            const id = doc.id;
            const row = document.createElement('tr');
            const enquiryDate = new Date(enquiry.date);
            const formattedDate = enquiryDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
            row.innerHTML = `
                <td>
                    <div class="contact-info">
                        <strong>${enquiry.name}</strong>
                        <span>${enquiry.email}</span>
                        <span>${enquiry.phone}</span>
                    </div>
                </td>
                <td>-</td>
                <td>${enquiry.details.substring(0, 50)}...</td>
                <td>${formattedDate}</td>
                <td><button class="delete-btn action-btn" data-id="${id}" data-type="enquiry">Delete</button></td>
            `;
            enquiriesTableBody.appendChild(row);
        });
    }

    // Function to load and display applications from Firestore
    async function loadApplications() {
        applicationsTableBody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
        const querySnapshot = await window.getDocs(window.collection(window.db, "applications"));
        applicationsTableBody.innerHTML = '';
        if (querySnapshot.empty) {
            applicationsTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No new applications found.</td></tr>';
            return;
        }
        querySnapshot.forEach((doc) => {
            const app = doc.data();
            const id = doc.id;
            const row = document.createElement('tr');
            const appDate = new Date(app.date);
            const formattedDate = appDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
            let resumeCell = `<a href="${app.resumeData}" target="_blank" download="${app.resumeName}" class="action-btn open-doc-btn"><i class="fas fa-file-alt"></i> Open Document</a>`;
            row.innerHTML = `
                <td>
                    <div class="contact-info">
                        <strong>${app.name}</strong>
                        <span>${app.email}</span>
                        <span>${app.phone}</span>
                        <span class="whatsapp-info"><i class="fab fa-whatsapp"></i> ${app.whatsapp || 'N/A'}</span>
                    </div>
                </td>
                <td><span class="status internship">${app.position}</span></td>
                <td>${app.experience}</td>
                <td>${formattedDate}</td>
                <td>${resumeCell}</td>
                <td><button class="delete-btn action-btn" data-id="${id}" data-type="application">Delete</button></td>
            `;
            applicationsTableBody.appendChild(row);
        });
    }
    
    // --- Delete Functionality for Firestore ---
    document.querySelector('.content-area').addEventListener('click', async function(e) {
        const button = e.target.closest('.delete-btn');
        if (button) {
            const id = button.getAttribute('data-id');
            const type = button.getAttribute('data-type');
            if (confirm('Are you sure you want to delete this entry? This cannot be undone.')) {
                try {
                    const collectionName = type === 'application' ? 'applications' : 'enquiries';
                    await window.deleteDoc(window.doc(window.db, collectionName, id));
                    
                    if (type === 'enquiry') loadEnquiries();
                    else if (type === 'application') loadApplications();
                } catch (error) {
                    console.error("Error removing document: ", error);
                    alert("Could not delete the entry. Please try again.");
                }
            }
        }
    });

    // --- Login and UI logic (no changes here) ---
    loginButton.addEventListener('click', function() {
        const correctUsername = 'engiplex07';
        const correctPassword = 'Er.Engiplex0711';
        if (document.getElementById('username').value === correctUsername && document.getElementById('password').value === correctPassword) {
            loginOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            loadEnquiries();
            loadApplications();
        } else {
            alert('Invalid username or password.');
        }
    });
    logoutButton.addEventListener('click', () => location.reload());
    const togglePassword = document.getElementById('togglePassword');
    togglePassword.addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
    showEnquiriesButton.addEventListener('click', function() {
        enquiriesSection.classList.remove('hidden');
        applicationsSection.classList.add('hidden');
        showEnquiriesButton.classList.add('active');
        showApplicationsButton.classList.remove('active');
    });
    showApplicationsButton.addEventListener('click', function() {
        enquiriesSection.classList.add('hidden');
        applicationsSection.classList.remove('hidden');
        showApplicationsButton.classList.add('active');
        showEnquiriesButton.classList.remove('active');
    });
});