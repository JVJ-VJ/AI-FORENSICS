// =========================================
// AI FORENSICS
// Investigator Registration
// Supabase Version
// =========================================

import { supabase } from "./supabase.js";


// ELEMENTS

const capturedImage = document.getElementById("capturedImage");

const investigatorId = document.getElementById("investigatorId");

const registerForm = document.getElementById("registerForm");

const fullName = document.getElementById("fullName");

const rank = document.getElementById("rank");

const department = document.getElementById("department");

const email = document.getElementById("email");

const phone = document.getElementById("phone");

const statusText = document.getElementById("statusText");


// =========================================
// CLOCK
// =========================================

function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
    now.toLocaleTimeString();

}

updateClock();

setInterval(updateClock,1000);


// =========================================
// LOAD CAPTURED PHOTO
// =========================================

const photo =
localStorage.getItem("capturedPhoto");


console.log("Captured photo:", photo);



if(photo){

    capturedImage.src = photo;

}
else{

    capturedImage.src =
    "https://placehold.co/400x500/111827/00E5FF?text=NO+PHOTO";

}



// =========================================
// GENERATE ID
// =========================================

function generateID(){

    let lastID =
    localStorage.getItem("lastInvestigatorID");


    if(lastID == null){

        lastID = 2043;

    }


    lastID = Number(lastID) + 5;


    localStorage.setItem(
        "lastInvestigatorID",
        lastID
    );


    investigatorId.value = lastID;

}


generateID();



// =========================================
// UPLOAD PHOTO TO SUPABASE STORAGE
// =========================================

async function uploadPhoto(id){


    console.log("Starting photo upload");


    const photoData =
    localStorage.getItem("capturedPhoto");



    if(!photoData){

        console.log("No photo found");

        return null;

    }



    const fileName =
    `investigator_${id}.png`;



    try{


        const response =
        await fetch(photoData);



        const blob =
        await response.blob();



        console.log(
            "Uploading:",
            fileName
        );



        const { error } =
        await supabase.storage
        .from("investigators")
        .upload(
            fileName,
            blob,
            {
                contentType:"image/png",
                upsert:true
            }
        );



        if(error){

            console.log(
                "Storage Error:",
                error
            );

            return null;

        }



        const { data } =
        supabase.storage
        .from("investigators")
        .getPublicUrl(fileName);



        console.log(
            "Photo URL:",
            data.publicUrl
        );



        return data.publicUrl;



    }
    catch(error){


        console.log(
            "Upload Failed:",
            error
        );


        return null;


    }


}




// =========================================
// SAVE INVESTIGATOR
// =========================================

registerForm.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    statusText.innerHTML =
    "Uploading investigator...";



    const imageURL =
    await uploadPhoto(
        investigatorId.value
    );



    const investigator = {


        id:
        Number(investigatorId.value),


        name:
        fullName.value,


        rank:
        rank.value,


        department:
        department.value,


        email:
        email.value,


        phone:
        phone.value,


        photo:
        imageURL,


        registered_at:
        new Date()

    };



    console.log(
        "Saving:",
        investigator
    );



    const { error } =
    await supabase
    .from("investigators")
    .insert([
        investigator
    ]);



    if(error){


        console.log(
            "Database Error:",
            error
        );


        statusText.innerHTML =
        "Database Error";


        return;

    }



    statusText.innerHTML =
    "✓ Investigator Registered Successfully";



    localStorage.setItem(
        "currentInvestigator",
        JSON.stringify(investigator)
    );



    setTimeout(()=>{


        window.location.href =
        "Index.html";


    },1500);



});