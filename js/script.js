/* ==========================================
   AIFORCE - AI FORENSICS COMMAND CENTER
   script.js
========================================== */

// ===============================
// START INVESTIGATION BUTTON
// ===============================

import { supabase } from "/js/supabase.js";

const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.addEventListener("click", () => {
        window.location.href = "casebrief.html";
    });
}

// ===============================
// DIGITAL CLOCK
// ===============================

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    clock.innerHTML = now.toLocaleTimeString();

}

setInterval(updateClock, 1000);

updateClock();


// ===============================
// LOADING SCREEN
// ===============================

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 700);

        }, 1500);

    }

});


// ===============================
// TYPING EFFECT
// ===============================

const typing = document.getElementById("typing");

if (typing) {

    const text = "WELCOME INVESTIGATOR... ACCESS GRANTED.";

    let i = 0;

    function type() {

        if (i < text.length) {

            typing.innerHTML += text.charAt(i);

            i++;

            setTimeout(type, 60);

        }

    }

    type();

}


// ===============================
// AI CHATBOT
// ===============================

function askAI() {

    const input = document.getElementById("question");

    const answer = document.getElementById("answer");

    if (!input || !answer) return;

    let q = input.value.toLowerCase();

    if (q.includes("suspect")) {

        answer.innerHTML =
            "AI Hint: Compare the CCTV timestamps with the Access Logs.";

    }

    else if (q.includes("cctv")) {

        answer.innerHTML =
            "AI Hint: One suspect entered the lab after official working hours.";

    }

    else if (q.includes("phone")) {

        answer.innerHTML =
            "AI Hint: Hidden messages indicate a secret meeting.";

    }

    else if (q.includes("voice")) {

        answer.innerHTML =
            "AI Hint: Voice analysis shows a 93% match.";

    }

    else if (q.includes("prototype")) {

        answer.innerHTML =
            "AI Hint: Follow the timeline carefully.";

    }

    else {

        answer.innerHTML =
            "AI: Unable to process. Try asking about CCTV, Suspects, Phone or Voice.";

    }

}


// ===============================
// VERDICT SYSTEM
// ===============================

function submitVerdict() {

    const suspect = document.getElementById("culprit");

    if (!suspect) return;

    if (suspect.value === "arjun") {

        alert("✅ Correct! Investigation Successful.");

        window.location.href = "result.html";

    }

    else {

        alert("❌ Incorrect Verdict. Re-analyze the evidence.");

    }

}


// ===============================
// TERMINAL EFFECT
// ===============================

const terminal = document.getElementById("terminal");

if (terminal) {

    const lines = [

        "Loading AI Modules...",

        "Connecting CCTV Database...",

        "Fingerprint Scanner Ready...",

        "Voice Recognition Online...",

        "Access Logs Loaded...",

        "Investigation Ready."

    ];

    let index = 0;

    function terminalOutput() {

        if (index < lines.length) {

            terminal.innerHTML +=

                "<p>> " + lines[index] + "</p>";

            index++;

            setTimeout(terminalOutput, 900);

        }

    }

    terminalOutput();

}


// ===============================
// PROGRESS BAR ANIMATION
// ===============================

const bars = document.querySelectorAll(".progress-fill");

bars.forEach((bar) => {

    let finalWidth = bar.style.width;

    bar.style.width = "0";

    setTimeout(() => {

        bar.style.width = finalWidth;

    }, 300);

});


// ===============================
// SCROLL FADE EFFECT
// ===============================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    sections.forEach(sec => {

        const top = sec.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            sec.style.opacity = "1";

            sec.style.transform = "translateY(0)";

        }

    });

});


// ===============================
// RANDOM STATUS
// ===============================

const statusText = document.getElementById("statusText");

if (statusText) {

    const status = [

        "SYSTEM ACTIVE",

        "AI ONLINE",

        "DATABASE CONNECTED",

        "SECURE NETWORK",

        "SURVEILLANCE READY"

    ];

    setInterval(() => {

        const random = Math.floor(Math.random() * status.length);

        statusText.innerHTML = status[random];

    }, 3000);

}


// ===============================
// SOUND EFFECTS
// ===============================

function clickSound() {

    const audio = document.getElementById("clickAudio");

    if (audio) {

        audio.play();

    }

}


// ===============================
// CARD HOVER EFFECT
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});


// ===============================
// CONSOLE MESSAGE
// ===============================

console.log("%cAIFORCE - AI FORENSICS COMMAND CENTER",
"color:cyan;font-size:20px;font-weight:bold;");

console.log("System Loaded Successfully.");



// ======================================
// LOAD INVESTIGATOR PROFILE
// ======================================


const investigator =
JSON.parse(
localStorage.getItem("currentInvestigator")
);



if(investigator){


const name =
document.getElementById(
"investigatorName"
);


const id =
document.getElementById(
"investigatorID"
);


const rank =
document.getElementById(
"investigatorRank"
);


const dept =
document.getElementById(
"investigatorDepartment"
);


const email =
document.getElementById(
"investigatorEmail"
);


const photo =
document.getElementById(
"investigatorPhoto"
);



if(name)
name.innerHTML =
"Welcome, " + investigator.name;



if(id)
id.innerHTML =
investigator.id;



if(rank)
rank.innerHTML =
investigator.rank;



if(dept)
dept.innerHTML =
investigator.department;



if(email)
email.innerHTML =
investigator.email;



if(photo && investigator.photo)
photo.src =
investigator.photo;



}
else{


console.log(
"No investigator logged in"
);


}


// ======================================
// LOAD ALL INVESTIGATORS
// ======================================

async function loadInvestigators() {

    const list = document.getElementById("investigatorList");

    if (!list) return;

    list.innerHTML = "Loading Investigators...";

    const { data, error } = await supabase
        .from("investigators")
        .select("*")
        .order("id", { ascending: true });

    if (error) {

        console.log(error);

        list.innerHTML = "Unable to load investigators";

        return;

    }

    list.innerHTML = "";

    data.forEach((person) => {

        const card = document.createElement("div");

        card.className = "investigator-card";

        card.innerHTML = `

            <img src="${person.photo}" alt="Photo">

            <h3>${person.name}</h3>

            <p><strong>ID:</strong> ${person.id}</p>

            <p><strong>Rank:</strong> ${person.rank}</p>

            <p><strong>Department:</strong> ${person.department}</p>

            <p>${person.email}</p>

        `;

        list.appendChild(card);

    });

}

window.addEventListener("DOMContentLoaded", () => {

    loadInvestigators();

});