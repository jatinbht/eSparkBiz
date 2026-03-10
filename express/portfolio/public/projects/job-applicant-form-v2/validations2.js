document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const errorField = validateForm();

    if (errorField) {
        e.preventDefault();
        console.log(`Invalid field: ${errorField.name || errorField.id}`);
    }
});

const validators = [
    () => validateEmail(document.querySelector('#email')),
    () => validateRequired(document.querySelectorAll('.required')),
    () => validateNumber(document.querySelectorAll('.number')),
    () => validateZip(document.querySelector('#zip')),
    // () => validateDate(document.querySelector('.date')),
    () => validateYear(document.querySelectorAll('.year')),
];

function validateForm() {
    for (let validator of validators) {
        const result = validator();

        if (result !== true) {
            return result;
        }
    }
    return null;
}

function validateEmail(element) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(element.value)) {
        return element;
    }

    return true;
}

function validateRequired(elements) {
    const textPattern = /^(?!\s*$).+/;

    for (let element of elements) {
        if (!textPattern.test(element.value)) {
            return element;
        }
    }

    return true;
}

function validateNumber(elements) {
    const numberPattern = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
    for (let element of elements) {
        if (!numberPattern.test(element.value)) {
            return element;
        }
    }
    return true;
}

function validateZip(element) {
    const zipPattern = /^\d{5}(?:[-\s]?\d{4})?$/;

    if (!zipPattern.test(element.value)) {
        return element;
    }

    return true;
}
// function validateDate(element) {
//     const datePattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/

//     if (!datePattern.test(element.value)) {
//         return element;
//     }

//     return true;
// }

function validateYear(elements) {
    const yearPattern = /^(19|20)\\d{2}$/;

    for (let element of elements) {
        if (!yearPattern.test(element.value)) {
            return element;
        }
    }

    return true;
}
