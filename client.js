// Smooth scrolling effect for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Show/hide mobile menu
const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('nav ul');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('show');
});


// Form submission
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Perform form validation here
    // ...

    // If form is valid, send form data to backend
    const formData = new FormData(form);
    const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        const response = await fetch('http://localhost:3000/inquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Show success message
            const successMsg = document.createElement('p');
            successMsg.textContent = 'Form submitted successfully!';
            successMsg.classList.add('success-msg');
            form.appendChild(successMsg);

            // Clear form fields after submission
            form.reset();

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        } else {
            // Show error message
            console.error('Failed to submit form:', response.status);
        }
    } catch (err) {
        console.error('Failed to submit form:', err);
    }
});
