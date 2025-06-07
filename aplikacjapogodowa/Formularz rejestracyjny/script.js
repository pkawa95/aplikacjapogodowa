    const userName = document.querySelector('input#username');
    const email = document.querySelector('input#email');
    const password1 = document.querySelector('input#password1');
    const password2 = document.querySelector('input#password2');
    const terms = document.querySelector('input#terms');
    const resetButton = document.querySelector('button.reset');
    const submitButton = document.querySelector('button.submit');

    const showOrHideErrorMessage = (input, text) => {
        const box = input.parentElement;
        const errorMsg = box.querySelector('p.error_message');
        errorMsg.textContent = text;  
        errorMsg.style.color = 'red';          
        errorMsg.style.fontStyle = 'italic';   
    }
    
    const checkInputLength = (input, minLength) => {
        if (input.value.length < minLength) {
            showOrHideErrorMessage(input, `Pole ${userName.previousElementSibling.textContent.toLowerCase().replace(":","")} powinno zawierać minimum ${minLength} znaki`);
        } else {
            showOrHideErrorMessage(input, '');
        }
    }

    const checkPasswordsValue = () => {
        if (password1.value !== password2.value) {
            showOrHideErrorMessage(password2, "Hasła są różne");
        } else {
            showOrHideErrorMessage(password2, "");
        }
    }


    const checkTerms = () => {
        if (!terms.checked) {
            showOrHideErrorMessage(terms, "Zaakceptuj regulamin");
        }
        else {
            showOrHideErrorMessage(terms,"");
        }
        }

        resetButton.addEventListener('click', () => {
            const allErrorMessages = [...document.querySelectorAll('p.error_message')];
            allErrorMessages.forEach(error => {
                error.textContent = ""; 
            });
        });

    const checkEmail = () => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!(re.test(email.value))) {
            showOrHideErrorMessage(email, "Adres email jest nieprawidłowy")
        }
        else {
            showOrHideErrorMessage(email,"");
        }
    }

    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        checkInputLength(userName, 3);
        checkInputLength(password1, 4);
        checkPasswordsValue();
        checkTerms();
        checkEmail();
    });