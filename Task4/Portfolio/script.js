
const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });


    

    const links =
        navLinks.querySelectorAll("a");

    links.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

        });

    });

}



const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}




const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            formMessage.textContent =
                "Thank you! Your message has been received.";

            contactForm.reset();

        }
    );

}