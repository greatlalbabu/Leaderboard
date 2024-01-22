document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let firstName = e.target.children[0].value;
    let lastName = e.target.children[1].value;
    let country = e.target.children[2].value;
    let score = e.target.children[3].value;

    let errorPrompter = document.querySelector(".main-error-prompt");
    errorPrompter.style.display = "none";

    if (firstName === "" || lastName === "" || country === "" || score === "") {
        return (errorPrompter.style.display = "block");
    }

    const scoreboardContainer = document.querySelector(".main-scoreWrapper");
    const scoreBoardElement = document.createElement("div");
    scoreBoardElement.classList.add("main-scoreboard");

    scoreBoardElement.innerHTML = `
        <div>
            <p class="main-player">${firstName} ${lastName}</p>
            <p class="main-time-stamp">${generateDateAndTime()}</p>
        </div>
        <p class="main-player-country">${country}</p>
        <p class="main-player-score">${score}</p>
        <div class="main-scoreboard-btn-container">
            <button>&#x1f5d1;</button>
            <button>+5</button>
            <button>-5</button>
        </div>
    `;

    scoreboardContainer.appendChild(scoreBoardElement);

    sortScoreBoard();
    activateBtnEventListener();
});

function generateDateAndTime() {
    let dateObj = new Date();
    let month = dateObj.toLocaleString("default", { month: "long" });
    let day = dateObj.getDate(),
        year = dateObj.getFullYear(),
        time = dateObj.toLocaleTimeString();

    let generateResult = `${month} ${day}, ${year} ${time}`;

    return generateResult;
}

function activateBtnEventListener() {
    document.querySelectorAll(".main-scoreboard-btn-container button").forEach((el) => {
        el.addEventListener("click", (e) => {
            let textContent = e.target.textContent;
            let scorePlayer = e.target.parentElement.parentElement.querySelector(".main-player-score");

            if (textContent === "🗑") {
                e.target.parentElement.parentElement.remove();
            } else {
                scorePlayer.textContent = parseInt(scorePlayer.textContent) + parseInt(textContent);
            }

            sortScoreBoard();
        });
    });
}

function sortScoreBoard() {
    let scoreboardcontainer = document.querySelector(".main-scoreWrapper");
    let scoreBoards = document.querySelectorAll(".main-scoreboard");
    let elementsArr = [];

    scoreBoards.forEach((el) => elementsArr.push(el));

    let sortedElents = elementsArr.sort((a, b) => {
        let numA = parseInt(a.querySelector(".main-player-score").textContent);
        let numB = parseInt(b.querySelector(".main-player-score").textContent);

        if (numA > numB) return -1;
        if (numA < numB) return 1;
        return 0;
    });

    sortedElents.forEach((el) => {
        scoreboardcontainer.appendChild(el);
    });
}

activateBtnEventListener();