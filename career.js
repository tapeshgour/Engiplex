document.addEventListener('DOMContentLoaded', function() {
    const applicationForm = document.getElementById('application-form');
    const formContainer = document.querySelector('.application-form-container');

    applicationForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const position = document.getElementById('position').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        const resumeFile = document.getElementById('resume').files[0];

        if (!resumeFile) {
            alert('Please select a resume file to upload.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(resumeFile);
        reader.onload = async function() {
            const resumeData = reader.result;

            const newApplication = {
                name: name,
                email: email,
                phone: phone,
                whatsapp: whatsapp,
                position: position,
                experience: experience,
                skills: skills,
                resumeName: resumeFile.name,
                resumeData: resumeData,
                date: new Date().toISOString()
            };

            try {
                // Save the new application to the 'applications' collection in Firestore
                const docRef = await window.addDoc(window.collection(window.db, "applications"), newApplication);
                console.log("Document written with ID: ", docRef.id);
                
                formContainer.innerHTML = `
                    <div style="text-align: center;">
                        <i class="fas fa-check-circle" style="font-size: 50px; color: #2ecc71;"></i>
                        <h2 style="color: #2c3e50; margin-top: 20px;">Thank You, ${name}!</h2>
                        <p style="color: #7f8c8d; font-size: 16px;">Your application has been submitted successfully.</p>
                    </div>
                `;
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("There was an error submitting your application. Please try again.");
            }
        };
    });
});