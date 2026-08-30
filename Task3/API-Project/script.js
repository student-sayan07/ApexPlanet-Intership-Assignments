const jokeButton =
document.getElementById("jokeBtn");

const jokeText =
document.getElementById("joke");

jokeButton.addEventListener(
"click",

async function () {

    jokeText.innerHTML =
        "Loading joke...";


    try {

        const response =
            await fetch(
                "https://official-joke-api.appspot.com/random_joke"
            );


        const data =
            await response.json();


        jokeText.innerHTML =

            data.setup +

            "<br><br>" +

            data.punchline;

    }


    catch (error) {

        jokeText.innerHTML =
            "Something went wrong!";

    }

}

);