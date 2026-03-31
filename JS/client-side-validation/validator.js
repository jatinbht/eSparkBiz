const form = document.querySelector('form')

form.addEventListener('submit', validate)

const validations = {
    address2: {
        isAfter: address1
    },
    state: {
        isEmpty: false
    }
}

function validate() {
    
}