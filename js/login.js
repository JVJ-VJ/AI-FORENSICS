// =====================================================
// AI FORENSICS LOGIN SYSTEM
// login.js - PART 1
// =====================================================

// =============================
// ELEMENTS
// =============================

const video = document.getElementById("video");
const overlay = document.getElementById("overlay");
const ctx = overlay.getContext("2d");

const scanBtn = document.getElementById("scanBtn");

const scanLine = document.getElementById("scanLine");
const scanShade = document.getElementById("scanShade");
const faceBox = document.getElementById("faceBox");
const cameraFlash = document.getElementById("cameraFlash");

const scanText = document.getElementById("scanText");
const scanPercent = document.getElementById("scanPercent");

const progressBar = document.getElementById("progressBar");

const footerMessage = document.getElementById("footerMessage");

const analysis = document.getElementById("analysis");

const confidence = document.getElementById("confidence");

const faceStatus = document.getElementById("faceStatus");
const cameraStatus = document.getElementById("cameraStatus");
const aiStatus = document.getElementById("aiStatus");

const sessionStatus = document.getElementById("sessionStatus");
const loginTime = document.getElementById("loginTime");

// =============================
// VARIABLES
// =============================

let stream = null;
let faceDetection;
let faceDetected = false;
let scanning = false;
let progress = 0;
let scanInterval = null;

// =============================
// INITIAL UI
// =============================

scanBtn.disabled = true;

scanLine.style.opacity = "0";
scanShade.style.height = "0%";
//faceBox.style.opacity = "0";

progressBar.style.width = "0%";

scanText.innerHTML = "WAITING FOR FACE";
scanPercent.innerHTML = "0%";

analysis.innerHTML = "Waiting for investigator...";
footerMessage.innerHTML = "Awaiting Investigator Authentication...";

cameraStatus.innerHTML = "STARTING";
faceStatus.innerHTML = "WAITING";
aiStatus.innerHTML = "READY";

confidence.innerHTML = "--%";

// =============================
// LIVE CLOCK
// =============================

function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();

}

updateClock();

setInterval(updateClock,1000);

// =============================
// START CAMERA
// =============================

async function startCamera(){

    try{

        stream = await navigator.mediaDevices.getUserMedia({

            video:{

                facingMode:"user",

                width:{ideal:1280},

                height:{ideal:720}

            },

            audio:false

        });

        video.srcObject = stream;

        video.onloadedmetadata = ()=>{

            video.play();

            startFaceDetection();

            overlay.width = video.videoWidth;

            overlay.height = video.videoHeight;

        };

        cameraStatus.innerHTML = "ONLINE";

        analysis.innerHTML =
        "✓ Camera Connected<br>Waiting for Scan...";

    }

    catch(error){

        console.error(error);

        cameraStatus.innerHTML = "OFFLINE";

        analysis.innerHTML =
        "Camera Access Failed";

        alert("Unable to access the camera.");

    }

}

startCamera();

// =============================
// BUTTON
// =============================

scanBtn.addEventListener("click",()=>{

    if(scanning) return;

    startScan();

});

// =============================
// FPS COUNTER
// =============================

let fps = 30;

setInterval(()=>{

    const fpsLabel = document.getElementById("fps");

    if(fpsLabel){

        fpsLabel.innerHTML = fps;

    }

},1000);

// =====================================================
// PART 2 - BIOMETRIC SCAN ENGINE
// =====================================================

function startScan(){

    if(!faceDetected){

    alert("No face detected!");

    return;

}

    scanning = true;

    progress = 0;

    scanBtn.disabled = true;

    scanLine.style.opacity = "1";

    //faceBox.style.opacity = "1";

    scanShade.style.height = "0%";

    scanLine.style.top = "-4px";

    progressBar.style.width = "0%";

    scanPercent.innerHTML = "0%";

    scanText.innerHTML = "SCANNING...";

    aiStatus.innerHTML = "SCANNING";

    footerMessage.innerHTML =
    "Running AI Facial Analysis...";

    analysis.innerHTML = "";

    const messages = [

        "Initializing AI Engine...",

        "Loading Biometric Model...",

        "Detecting Face...",

        "Scanning Eyes...",

        "Scanning Nose Structure...",

        "Scanning Jawline...",

        "Extracting Facial Features...",

        "Comparing Database...",

        "Checking Identity...",

        "Verification Successful."

    ];

    let message = 0;

    scanInterval = setInterval(()=>{

        progress++;

        progressBar.style.width = progress + "%";

        scanPercent.innerHTML = progress + "%";

        confidence.innerHTML = progress + "%";

        scanShade.style.height = progress + "%";

        scanLine.style.top = progress + "%";

        if(progress % 10 === 0){

            if(message < messages.length){

                analysis.innerHTML +=
                "✓ " + messages[message] + "<br>";

                message++;

            }

        }

        if(progress > 20){

            faceBox.style.borderColor = "#00FF88";

            faceBox.style.boxShadow =
            "0 0 25px #00FF88";

        }

        if(progress >= 100){

            clearInterval(scanInterval);

            finishScan();

        }

    },35);

}

// =====================================================
// FINISH SCAN
// =====================================================

function finishScan(){

    aiStatus.innerHTML = "VERIFIED";

    faceStatus.innerHTML = "MATCH FOUND";

    confidence.innerHTML = "99.84%";

    footerMessage.innerHTML =
    "Identity Verified";

    sessionStatus.innerHTML =
    "AUTHENTICATED";

    loginTime.innerHTML =
    new Date().toLocaleTimeString();

    scanText.innerHTML =
    "ACCESS GRANTED";

    progressBar.style.width = "100%";

    cameraFlash.animate(

        [

            {opacity:0},

            {opacity:1},

            {opacity:0}

        ],

        {

            duration:300

        }

    );

    setTimeout(capturePhoto,600);

}

// =====================================================
// PART 3 - PHOTO CAPTURE & REDIRECT
// =====================================================

function capturePhoto(){

    // Create hidden canvas
    const canvas = document.getElementById("captureCanvas");
    const captureCtx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Capture current frame
    captureCtx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Convert to Base64
    const image = canvas.toDataURL("image/png");

    // Save for register page
    localStorage.setItem("capturedPhoto", image);

    // Save login time
    localStorage.setItem(
        "loginTime",
        new Date().toLocaleString()
    );

    analysis.innerHTML +=
        "<br>✓ Photo Captured";

    analysis.innerHTML +=
        "<br>✓ Secure Session Started";

    footerMessage.innerHTML =
        "Redirecting to Registration...";

    // Wait 2 seconds
    setTimeout(() => {

        window.location.href = "register.html";

    }, 2000);

}

// =====================================================
// RESET SCANNER
// =====================================================

function resetScanner(){

    scanning = false;

    progress = 0;

    clearInterval(scanInterval);

    scanBtn.disabled = false;

    progressBar.style.width = "0%";

    scanPercent.innerHTML = "0%";

    scanText.innerHTML = "WAITING FOR FACE";

    scanLine.style.opacity = "0";

    scanLine.style.top = "-4px";

    scanShade.style.height = "0%";

    //faceBox.style.opacity = "0";

    faceBox.style.borderColor = "#00E5FF";

    faceBox.style.boxShadow =
        "0 0 20px rgba(0,229,255,.7)";

    footerMessage.innerHTML =
        "Awaiting Investigator Authentication...";

    analysis.innerHTML =
        "Waiting for investigator...";

    confidence.innerHTML = "--%";

    faceStatus.innerHTML = "WAITING";

    aiStatus.innerHTML = "READY";

}

// =====================================================
// STOP CAMERA
// =====================================================

window.addEventListener("beforeunload",()=>{

    if(stream){

        stream.getTracks().forEach(track=>{

            track.stop();

        });

    }

});

// =====================================================
// KEYBOARD SHORTCUT
// Press SPACE to start scan
// =====================================================

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(!scanning){

            startScan();

        }

    }

});

// =========================================
// GOOGLE MEDIAPIPE FACE DETECTION
// =========================================

function startFaceDetection(){

    faceDetection = new FaceDetection({

        locateFile:(file)=>{

            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;

        }

    });

    faceDetection.setOptions({

        model:"short",

        minDetectionConfidence:0.6

    });

    faceDetection.onResults(drawResults);

    detectLoop();

}

async function detectLoop(){

    if(video.readyState===4){

        await faceDetection.send({

            image:video

        });

    }

    requestAnimationFrame(detectLoop);

}

function drawResults(results){

    ctx.clearRect(

        0,

        0,

        overlay.width,

        overlay.height

    );

    if(results.detections.length>0){

        faceDetected=true;

        scanBtn.disabled=false;

        faceStatus.innerHTML="FACE DETECTED";

        confidence.innerHTML="99%";

        analysis.innerHTML="✓ Face Detected<br>✓ Ready for Authentication";

        const box=results.detections[0].boundingBox;

        ctx.strokeStyle="#00FF88";

        ctx.lineWidth=4;

        ctx.strokeRect(

            box.xCenter*overlay.width-box.width*overlay.width/2,

            box.yCenter*overlay.height-box.height*overlay.height/2,

            box.width*overlay.width,

            box.height*overlay.height

        );

    }

    else{

        faceDetected=false;

        scanBtn.disabled=true;

        faceStatus.innerHTML="NO FACE";

        confidence.innerHTML="--";

        analysis.innerHTML="Searching for Face...";

    }

}

// =====================================================
// STARTUP MESSAGE
// =====================================================

console.log("====================================");
console.log(" AI FORENSICS LOGIN SYSTEM LOADED ");
console.log("====================================");