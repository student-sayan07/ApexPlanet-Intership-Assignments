const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const subjectError =
        document.getElementById("subjectError");

    const messageError =
        document.getElementById("messageError");



    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";


    let isValid = true;

    if (name === "") {

        nameError.textContent =
            "Please enter your name.";

        isValid = false;
    }


    if (email === "") {

        emailError.textContent =
            "Please enter your email address.";

        isValid = false;

    } else {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            isValid = false;
        }
    }


    if (subject === "") {

        subjectError.textContent =
            "Please enter a subject.";

        isValid = false;
    }


    if (message === "") {

        messageError.textContent =
            "Please enter your message.";

        isValid = false;
    }

    if (isValid) {

        alert(
            "Your message has been submitted successfully!"
        );

        contactForm.reset();
    }

});