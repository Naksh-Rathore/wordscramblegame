const question = document.getElementById("question");
const ansInputBox = document.getElementById("ans");
const submitBtn = document.querySelector("button");

const correctSound = new Audio("./correct.mp3");
const wrongSound = new Audio("./wrong.mp3");
const mouseClickSound = new Audio("./mouse-click.mp3");

const questionsPossible = [{ans: "argentina", ques: "rgnainaet"},
                        {ans: "airplane", ques: "irnaalep"},
                        {ans: "mountain", ques: "amounnit"},
                        {ans: "forest", ques: "tfeors"},
                        {ans: "solution", ques: "isolunot"},
                        {ans: "shoulder", ques: "dshourel"}];                           

let questions = [];

let index1;
let index2;
let index3;

let score = 0;

let questionNum = 0;

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        checkAns();
    }
})

while (true) {
    index1 = Math.floor(Math.random() * 6);
    index2 = Math.floor(Math.random() * 6);
    index3 = Math.floor(Math.random() * 6);
    
    if (index1 !== index2 && index1 !== index3 && index2 !== index3) {
        questions.push(questionsPossible[index1]);
        questions.push(questionsPossible[index2]);
        questions.push(questionsPossible[index3]);

        break;
    }
} 

question.textContent = questions[questionNum].ques;

function checkAns() {
    const ans = ansInputBox.value.trim().toLowerCase();

    if (ans.length > 0 && !ans.includes(" ")) {

        if (questionNum < questions.length) {
            question.textContent = questions[questionNum].ques;

            if (ans === questions[questionNum].ans) {
                score++;
                questionNum++;
                document.body.style.backgroundColor = "green";

                wrongSound.pause();

                correctSound.currentTime = 0;
                correctSound.play();

                setTimeout(() => {
                    question.textContent = questions[questionNum].ques;
                    document.body.style.backgroundColor = "rgb(217, 217, 217)";
                }, 1000);
            }

            else {
                questionNum++;
                document.body.style.backgroundColor = "red";

                correctSound.pause();

                wrongSound.currentTime = 0;
                wrongSound.play();

                setTimeout(() => {
                    question.textContent = questions[questionNum].ques;                document.body.style.backgroundColor = "red";
                    document.body.style.backgroundColor = "rgb(217, 217, 217)";
                }, 1000);
            }
        }
    
        if (questionNum >= questions.length) {
            setTimeout(() => {
                document.body.style.backgroundColor = "rgb(217, 217, 217)";
                question.textContent = `Score: ${score}/${questions.length}`;
                submitBtn.onclick = function() {};
            }, 2250);
        } 
    }

    else {
        window.alert("Please enter a word");
    }
}