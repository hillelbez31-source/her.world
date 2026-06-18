const questions = [

{
image:"images/a.jpg",
prompt:"Give a real situation where you would send this meme."
},

{
image:"images/b.jpg",
prompt:"Describe the perfect moment for this meme."
},

{
image:"images/c.jpg",
prompt:"What would someone have to say for you to instantly send this?"
},

{
image:"images/d.jpg",
prompt:"Tell a realistic story that ends with you sending this image."
},

{
image:"images/e.jpg",
prompt:"What is this meme's natural habitat?"
},

{
image:"images/f.jpg",
prompt:"Invent a conversation where this reaction is the only correct response."
},

{
image:"images/g.jpg",
prompt:"Describe a moment where this meme would save the day."
},

{
image:"images/h.jpg",
prompt:"What message would appear immediately before you send this?"
},

{
image:"images/i.jpg",
prompt:"Give a real-life example where this reaction is justified."
},

{
image:"images/j.jpg",
prompt:"Explain the chain of events leading to this image being sent."
},

{
image:"images/k.jpg",
prompt:"What crime did the other person commit to deserve this reaction?"
},

{
image:"images/l.jpg",
prompt:"Create a scenario where this image becomes necessary."
},

{
image:"images/m.jpg",
prompt:"Describe the exact moment this meme enters the chat."
},

{
image:"images/n.jpg",
prompt:"Give an example of a conversation ruined by this image."
},

{
image:"images/o.jpg",
prompt:"What would make you send this at 3AM?"
},

{
image:"images/p.jpg",
prompt:"Describe the level of happiness required for this reaction."
},

{
image:"images/q.jpg",
prompt:"What happened 5 seconds before this picture was sent?"
},

{
image:"images/r.jpg",
prompt:"Write the message that forced you to use this meme."
},

{
image:"images/marcehappycat.png",
prompt:"Explain why this cat is so happy."
}

];

let currentQuestion = 0;

let answers = [];

let croissantAnswer = "";

const screens =
document.querySelectorAll(".screen");

function showScreen(id){

screens.forEach(screen=>{

screen.classList.remove("active");

});

document
.getElementById(id)
.classList.add("active");

}

const startBtn =
document.getElementById("startBtn");

const nextBtn =
document.getElementById("nextBtn");

const answerInput =
document.getElementById("answerInput");

const warningText =
document.getElementById("warningText");

const questionImage =
document.getElementById("questionImage");

const questionPrompt =
document.getElementById("questionPrompt");

const questionCounter =
document.getElementById("questionCounter");

startBtn.addEventListener("click",()=>{

const sound =
document.getElementById("startSound");

if(sound) sound.play();

showScreen("question-screen");

loadQuestion();

});

function loadQuestion(){

const q =
questions[currentQuestion];

questionImage.src =
q.image;

questionPrompt.textContent =
q.prompt;

questionCounter.textContent =
`Question ${currentQuestion+1} / 19`;

answerInput.value = "";

warningText.textContent = "";

window.scrollTo(0,0);

}

nextBtn.addEventListener("click",()=>{

const answer =
answerInput.value.trim();

if(answer.length < 4){

warningText.textContent =
"⚠ Please write a real answer.";

return;

}

answers.push({

image:
questions[currentQuestion].image,

prompt:
questions[currentQuestion].prompt,

answer:
answer

});

currentQuestion++;

if(currentQuestion <
questions.length){

loadQuestion();

}else{

showScreen("photo-screen");

}

});

document
.querySelectorAll(".photoChoice")
.forEach(button=>{

button.addEventListener("click",()=>{

const value =
button.dataset.value;

const msg =
document.getElementById(
"photoMessage"
);

if(value !== "both"){

document
.getElementById("noSound")
.play();

document.body.classList.add(
"shake"
);

setTimeout(()=>{

document.body.classList.remove(
"shake"
);

},500);

msg.textContent =
"❌ Think again.";

return;

}

msg.textContent =
"✅ Correct answer.";

document
.getElementById("yippeeSound")
.play();

document
.getElementById(
"photoContinue"
)
.style.display =
"inline-block";

});

});

document
.getElementById(
"photoContinue"
)
.addEventListener(
"click",
()=>{

showScreen(
"croissant-screen"
);

});

document
.querySelectorAll(
".croissantBtn"
)
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

croissantAnswer =
btn.dataset.answer;

showScreen(
"joke-screen"
);

});

});

document
.getElementById(
"revealBtn"
)
.addEventListener(
"click",
()=>{

buildReview();

showScreen(
"review-screen"
);

});

function buildReview(){

const container =
document.getElementById(
"reviewContainer"
);

container.innerHTML = "";

answers.forEach(item=>{

const card =
document.createElement("div");

card.className =
"review-card";

card.innerHTML = `

<img
src="${item.image}"
class="review-image">

<p>
<strong>Prompt:</strong>
${item.prompt}
</p>

<p>
<strong>Your answer:</strong>
${item.answer}
</p>

`;

container.appendChild(card);

});

const extra =
document.createElement("div");

extra.className =
"review-card";

extra.innerHTML = `

<p>
<strong>
Do you love croissant?
</strong>
</p>

<p>
${croissantAnswer}
</p>

`;

container.appendChild(extra);

}

document
.getElementById(
"finalBtn"
)
.addEventListener(
"click",
()=>{

document
.getElementById(
"yippeeSound"
)
.play();

showScreen(
"final-screen"
);

});