const RegPage = document.querySelector(".quizStart")
const QuizPage = document.querySelector(".Quiz")
const start = document.querySelector("#start-btn")
const startAgain = document.querySelector("#start-again")
const Username = document.querySelector(".username")
const QuizUser = document.querySelectorAll(".quiz-user")
const QuesBox = document.querySelector(".quiz-ques")
const QuesStart = document.querySelector("#QuesStart")
const QuesLast = document.querySelector("#QuesLast")
const Result = document.querySelector(".result")
const ResultPage = document.querySelector(".quizResult")
const Score = document.querySelectorAll(".score")
const MIN = document.querySelector("#min")
const SEC = document.querySelector("#sec")
const Time = document.querySelector(".time")

// Load Time
setTimeout(() => {
    document.body.style.backgroundImage = "url('./background.jpg')";
    RegPage.style.display = "block"
}, 10000)



Username.addEventListener("click", () => {
    Username.value = ""
})

let Data = [];
fetch("Questions.json")
    .then((res) => res.json()).then((data) => {
        data.forEach(q => {
            Data.push(q)
        });
    })
    .catch((err) => console.log(err));


let user;
let QuesNo = 1;
let min, sec;
let timer;
start.addEventListener("click", () => {
    user = Username.value
    RegPage.style.display = "none"
    QuizPage.style.display = "block"
    MIN.innerHTML = "00"
    SEC.innerHTML = "00"
    min = 0
    sec = 0
    timer = setInterval(() => {
        if (sec == 59) {
            min++
            sec = 0
        }
        else
            sec++
        if (min < 10)
            MIN.innerHTML = "0" + min
        else
            MIN.innerHTML = min
        if (sec < 10)
            SEC.innerHTML = "0" + sec
        else
            SEC.innerHTML = sec
    }, 1000)

    QuizUser[0].innerHTML = user
    QuesStart.innerHTML = QuesNo
    QuesLast.innerHTML = Data.length
    QuesBox.innerHTML = ""
    QuesBox.innerHTML += `<div class="ques">${Data[QuesNo - 1].question}</div>
    <div class="quiz-ans">`
    for (let [key, opt] of Object.entries(Data[QuesNo - 1].Options)) {
        QuesBox.innerHTML += `<div class="options">
            <span class="opt">${key}.</span>
            <input type="radio" name="answers" id="${key}" value="${opt}">
            ${opt}`
    }
    QuesBox.innerHTML += `<div class="subnext">
            <button class="submit" onclick="SubmitQues()">Submit</button>
            <button class="next" onclick="ChangeQues()">Next</button>
        </div>`
})

let flag = false
let sco = 0
let go = false
function SubmitQues() {
    const answer = document.querySelector('input[name = answers]:checked')
    if (answer) {
        go = true
        if (answer.id == Data[QuesNo - 1].Answer) {
            Result.innerHTML = "Correct Answer! Go to next question"
            flag = true
        }
        else {
            Result.innerHTML = "Wrong Answer! The correct answer is " + Data[QuesNo - 1].Answer
            flag = false
        }
        document.querySelector(".submit").disabled = true
        document.querySelectorAll('input[name = answers]').forEach((radio) => radio.disabled = true)

    }
    else {
        alert("Please Answer The Question...")
    }
}

function ChangeQues() {
    if (flag) {
        sco++
        flag = false
    }
    Result.innerHTML = ""
    if (go) {
        go = false
        if (QuesNo != Data.length) {
            QuesNo++
            QuesStart.innerHTML = QuesNo
            QuesBox.innerHTML = ""
            QuesBox.innerHTML += `<div class="ques">${Data[QuesNo - 1].question}</div>
        <div class="quiz-ans">`
            for (let [key, opt] of Object.entries(Data[QuesNo - 1].Options)) {
                QuesBox.innerHTML += `<div class="options">
                <span class="opt">${key}.</span>
                <input type="radio" name="answers" id="${key}" value="${opt}">
                ${opt}</div>`
            }
            QuesBox.innerHTML += `</div><div class="subnext">
                <button class="submit" onclick="SubmitQues()">Submit</button>
                <button class="next" onclick="ChangeQues()">Next</button>
            </div>`
        }
        else {
            QuesNo = 1
            clearInterval(timer)
            QuizPage.style.display = "none"
            ResultPage.style.display = "block"
            Score.forEach(s => s.innerHTML = sco);
            document.querySelector("#ResultLast").innerHTML = Data.length
            QuizUser[1].innerHTML = user
            // if (sec<10)
            //     Time.innerHTML=`${min} : 0${sec}`
            // else
            //     Time.innerHTML=`${min} : ${sec}`
            Time.innerHTML = `${MIN.innerHTML} : ${SEC.innerHTML}`
        }
    }
    else {
        alert("Please Submit The Question...")
    }
}

startAgain.addEventListener("click", () => {
    sco = 0
    RegPage.style.display = "block"
    ResultPage.style.display = "none"
})
