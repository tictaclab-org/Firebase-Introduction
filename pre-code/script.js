// // Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
// import "firebase/firestore";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBOANjd-6RjvBFiZvxVmZN2DaEHdzSIYKY",
//   authDomain: "ttl---quizz.firebaseapp.com",
//   projectId: "ttl---quizz",
//   storageBucket: "ttl---quizz.appspot.com",
//   messagingSenderId: "907278725920",
//   appId: "1:907278725920:web:430c9316e1c4a387b21d45",
//   measurementId: "G-1V4Y99ZF8N"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
// const firestore = firebase.firestore();
// firestore.collection("Questions").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
// });

// Variables globales
let nom = "";
let question_id = -1;
let question_total = 3;
let question_answer = null;
let score = 0;

// Elements de question et de réponses
const div_nom       = document.getElementById("div_nom");
const form_nom      = document.getElementById("form_nom");
const div_question  = document.getElementById("div_question");
const form_question = document.getElementById("form_question");
const question_text = document.getElementById("question_text");
const question_resA = document.getElementById("question_resA");
const question_resB = document.getElementById("question_resB");
const question_resC = document.getElementById("question_resC");
const question_resD = document.getElementById("question_resD");
const div_results   = document.getElementById("div_results");
const p_results     = document.getElementById("p_results");

// Function pour collecter nom et passer aux questions
function montrerQuestions(event) {
    event.preventDefault();

    // Collecter réponse du formulaire
    const data = Object.fromEntries(new FormData(event.target));
    nom = data["nom"];

    // Cacher div pour le nom, et montrer div pour les questions
    div_nom.style.display = "none";
    div_question.style.display = "block";

    // Mettre à jour la question
    questionSuivante();
}

// Function pour corriger question et changer de question
function montrerQuestionSuivante(event) {
    event.preventDefault();

    // Collecter réponse du joueur
    const data = Object.fromEntries(new FormData(event.target));
    res = data["reponse"];

    // Ajouter un point si la réponse est correcte
    if (res == question_answer) {
        score += 1;
    }

    // Mettre à jour la question
    questionSuivante();
}

// Function pour passer à la question suivante
function questionSuivante() {
    // Mettre à jour le numéro de la question
    question_id += 1;

    // Si à la fin des questions, passer aux résultats
    if (question_id == question_total) {
        montrerResultats();
    } else {
        // Mettre à jour la question et les réponses possibles
        question_text.textContent = questions[question_id].question;
        question_resA.textContent = questions[question_id].answers["a"];
        question_resB.textContent = questions[question_id].answers["b"];
        question_resC.textContent = questions[question_id].answers["c"];
        question_resD.textContent = questions[question_id].answers["d"];

        // Sauvegarder index de la réponse correcte
        question_answer = questions[question_id].correct;
    }
}

function montrerResultats() {
    // Afficher nombre de points
    p_results.textContent = `Félicitations ${nom}, tu as obtenu ${score} points!`;

    // Cacher les questions et montrer résultats
    div_question.style.display = "none";
    div_results.style.display = "block";
}

// Attacher des fonctions lorsque les formulaires sont soumis
form_nom.addEventListener("submit", montrerQuestions);
form_question.addEventListener("submit", montrerQuestionSuivante);