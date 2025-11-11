// Enquiry.js — Firebase-integrated version
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
  const enquiryForm = document.getElementById("enquiry-form");
  const formContainer = document.querySelector(".enquiry-form-container");

  enquiryForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const details = document.getElementById("project-details").value.trim();

    const newEnquiry = {
      name,
      email,
      phone,
      details,
      date: new Date().toISOString(),
    };

    try {
      const enquiryRef = ref(window.db, "enquiries");
      const newRef = push(enquiryRef);
      await set(newRef, newEnquiry);

      formContainer.innerHTML = `
        <div style="text-align:center;">
          <i class="fas fa-check-circle" style="font-size:50px;color:#2ecc71;"></i>
          <h2 style="color:#2c3e50;margin-top:20px;">Thank You, ${name}!</h2>
          <p style="color:#7f8c8d;font-size:16px;">
            Your enquiry has been submitted successfully. We will contact you shortly.
          </p>
        </div>`;
      console.log("✅ Enquiry data saved successfully.");
    } catch (error) {
      console.error("❌ Firebase Error:", error);
      alert("Failed to submit enquiry. Please try again later.");
    }
  });
});
