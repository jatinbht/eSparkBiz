document.querySelector('form').addEventListener('submit', function (e) {
    if (!validateForm()) {
        e.preventDefault();
        console.log('error')
    }
});

// const errorDiv = document.querySelector('#formError');

const validators = [
    () => validateEmail(document.querySelector('#email').value),
    () => validateRequired(document.querySelector('.required').value),
    
];

function validateForm() {
    return validators.every(validator => validator());
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateRequired(text) {
    const textPattern = /^(?!\s*$).+/ 
    return textPattern.test(text);
}


