// =========================================
// AI FORENSICS
// Investigator Registration
// Supabase Version
// =========================================

import { supabase } from "./supabase.js";


// ELEMENTS

const capturedImage = document.getElementById("capturedImage");

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
// UPLOAD PHOTO TO SUPABASE STORAGE
// =========================================

async function uploadPhoto(){ 


    console.log("Starting photo upload");


    const photoData =
    localStorage.getItem("capturedPhoto");



    if(!photoData){

        console.log("No photo found");

        return null;

    }



const fileName =
`investigator_${Date.now()}_${Math.floor(Math.random()*100000)}.png`;



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
                upsert:false
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



    const imageURL = await uploadPhoto();


const investigator = {
    name: fullName.value,
    rank: rank.value,
    department: department.value,
    email: email.value,
    phone: phone.value,
    photo: imageURL
};



    console.log(
        "Saving:",
        investigator
    );



const { data, error } = await supabase
    .from("investigators")
    .insert(investigator)
    .select();



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
    JSON.stringify(data[0])
);


    setTimeout(()=>{


    window.location.href = "home.html";


    },1500);



});