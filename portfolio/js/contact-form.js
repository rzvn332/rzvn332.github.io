document.addEventListener('DOMContentLoaded', () => {
    // Inițializează EmailJS cu cheia ta publică
    emailjs.init('UextDXLOchveGh94J');
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> SENDING...';
            submitBtn.classList.add('opacity-75');
            
            // Parametrii pentru trimiterea email-ului
            const templateParams = {
                from_name: contactForm.from_name.value,
                from_email: contactForm.from_email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };
            
            // Trimite email-ul folosind EmailJS
            emailjs.send('service_f2qo6tc', 'template_dda0ar8', templateParams)
                .then(() => {
                    // Mesaj de succes mai atrăgător
                    const successMessage = document.createElement('div');
                    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
                    successMessage.innerHTML = `
                        <div class="flex items-center">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>Message sent successfully!</span>
                        </div>
                    `;
                    document.body.appendChild(successMessage);
                    
                    // Ascunde mesajul după 5 secunde
                    setTimeout(() => {
                        successMessage.classList.add('animate-fade-out');
                        setTimeout(() => successMessage.remove(), 500);
                    }, 5000);
                    
                    contactForm.reset();
                })
                .catch((error) => {
                    // Mesaj de eroare mai vizibil
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
                    errorMessage.innerHTML = `
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle mr-2"></i>
                            <span>Error sending message. Please try again.</span>
                        </div>
                    `;
                    document.body.appendChild(errorMessage);
                    
                    // Ascunde mesajul după 5 secunde
                    setTimeout(() => {
                        errorMessage.classList.add('animate-fade-out');
                        setTimeout(() => errorMessage.remove(), 500);
                    }, 5000);
                    
                    console.error('Failed to send message:', error);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('opacity-75');
                });
        });
    }
});
