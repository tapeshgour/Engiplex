document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById('enquiry-form');
    const formContainer = document.querySelector('.enquiry-form-container');

    enquiryForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const details = document.getElementById('project-details').value;

        const newEnquiry = {
            name: name,
            email: email,
            phone: phone,
            details: details,
            date: new Date().toISOString()
        };

        try {
            // Save the new enquiry to the 'enquiries' collection in Firestore
            const docRef = await window.addDoc(window.collection(window.db, "enquiries"), newEnquiry);
            console.log("Enquiry saved with ID: ", docRef.id);

            formContainer.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-check-circle" style="font-size: 50px; color: #2ecc71;"></i>
                    <h2 style="color: #2c3e50; margin-top: 20px;">Thank You, ${name}!</h2>
                    <p style="color: #7f8c8d; font-size: 16px;">Your enquiry has been submitted successfully.</p>
                </div>
            `;
        } catch (error) {
            console.error("Error adding enquiry: ", error);
            alert("There was an error submitting your enquiry. Please try again.");
        }
    });
});