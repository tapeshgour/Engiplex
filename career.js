// career.js — Firebase-integrated version
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
  const applicationForm = document.getElementById("application-form");
  const formContainer = document.querySelector(".application-form-container");

  applicationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const position = document.getElementById("position").value;
    const experience = document.getElementById("experience").value;
    const skills = document.getElementById("skills").value.trim();
    const resumeFile = document.getElementById("resume").files[0];
    const resumeName = resumeFile ? resumeFile.name : "No file selected";

    const newApplication = {
      name,
      email,
      phone,
      position,
      experience,
      skills,
      resume: resumeName,
      date: new Date().toISOString(),
    };

    try {
      const appRef = ref(window.db, "applications");
      const newRef = push(appRef);
      await set(newRef, newApplication);

      formContainer.innerHTML = `
        <div style="text-align:center;">
          <i class="fas fa-check-circle" style="font-size:50px;color:#2ecc71;"></i>
          <h2 style="color:#2c3e50;margin-top:20px;">Thank You, ${name}!</h2>
          <p style="color:#7f8c8d;font-size:16px;">
            Your application has been submitted successfully. We will review it soon.
          </p>
        </div>`;
      console.log("✅ Career application saved successfully.");
    } catch (error) {
      console.error("❌ Firebase Error:", error);
      alert("Failed to submit application. Please try again later.");
    }
  });
});
