// admin.js — Firebase Integrated Version (Engiplex)
import { ref, onValue, remove } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
    const loginOverlay = document.getElementById("login-overlay");
    const loginButton = document.getElementById("login-button");
    const mainContent = document.getElementById("main-content");
    const showEnquiriesButton = document.getElementById("show-enquiries");
    const showApplicationsButton = document.getElementById("show-applications");
    const enquiriesSection = document.getElementById("enquiries-section");
    const applicationsSection = document.getElementById("applications-section");

    const enquiriesTableBody = document.getElementById("enquiries-table-body");
    const applicationsTableBody = document.getElementById("applications-table-body");

    // 🔒 Admin login (simple static check)
    loginButton.addEventListener("click", function () {
        const usernameInput = document.getElementById("username").value.trim();
        const passwordInput = document.getElementById("password").value.trim();

        if (usernameInput === "engiplex07" && passwordInput === "Er.Engiplex0711") {
            loginOverlay.classList.add("hidden");
            mainContent.classList.remove("hidden");
            loadEnquiries();
            loadApplications();
        } else {
            alert("Invalid credentials");
        }
    });

    // 👁️ Toggle password visibility
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
    });

    // 📥 Load enquiries from Firebase
    function loadEnquiries() {
        const enquiryRef = ref(window.db, "enquiries");
        onValue(enquiryRef, (snapshot) => {
            const data = snapshot.val();
            enquiriesTableBody.innerHTML = "";

            if (!data) {
                enquiriesTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No new enquiries found.</td></tr>`;
                return;
            }

            Object.entries(data).forEach(([key, enquiry]) => {
                const row = document.createElement("tr");
                const formattedDate = new Date(enquiry.date).toLocaleString();
                row.innerHTML = `
          <td>
            <div class="contact-info">
              <strong>${enquiry.name}</strong>
              <span>${enquiry.email}</span>
              <span>${enquiry.phone}</span>
            </div>
          </td>
          <td>-</td>
          <td>${enquiry.details || "—"}</td>
          <td>${formattedDate}</td>
          <td><button class="delete-btn" data-id="${key}" data-type="enquiry">Delete</button></td>
        `;
                enquiriesTableBody.appendChild(row);
            });
        });
    }

    // 📥 Load career applications from Firebase
    function loadApplications() {
        const appRef = ref(window.db, "applications");
        onValue(appRef, (snapshot) => {
            const data = snapshot.val();
            applicationsTableBody.innerHTML = "";

            if (!data) {
                applicationsTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No new applications found.</td></tr>`;
                return;
            }

            Object.entries(data).forEach(([key, app]) => {
                const row = document.createElement("tr");
                const formattedDate = new Date(app.date).toLocaleString();
                row.innerHTML = `
          <td>
            <div class="contact-info">
              <strong>${app.name}</strong>
              <span>${app.email}</span>
              <span>${app.phone}</span>
            </div>
          </td>
          <td><span class="status internship">${app.position}</span></td>
          <td>${app.experience}</td>
          <td>${formattedDate}</td>
          <td><button class="delete-btn" data-id="${key}" data-type="application">Delete</button></td>
        `;
                applicationsTableBody.appendChild(row);
            });
        });
    }

    // 🗑️ Delete button handler (Firebase remove)
    document.querySelector(".content-area").addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = e.target.getAttribute("data-id");
            const type = e.target.getAttribute("data-type");

            if (confirm("Are you sure you want to delete this entry?")) {
                const deleteRef = ref(window.db, `${type === "enquiry" ? "enquiries" : "applications"}/${id}`);
                remove(deleteRef)
                    .then(() => alert("Deleted successfully!"))
                    .catch((err) => alert("Error deleting: " + err.message));
            }
        }
    });

    // 🧭 Sidebar toggling
    showEnquiriesButton.addEventListener("click", function () {
        enquiriesSection.classList.remove("hidden");
        applicationsSection.classList.add("hidden");
        this.classList.add("active");
        showApplicationsButton.classList.remove("active");
    });

    showApplicationsButton.addEventListener("click", function () {
        applicationsSection.classList.remove("hidden");
        enquiriesSection.classList.add("hidden");
        this.classList.add("active");
        showEnquiriesButton.classList.remove("active");
    });
});
