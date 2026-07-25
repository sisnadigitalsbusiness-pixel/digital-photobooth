// =========================
// CAMERA ELEMENTS
// =========================

const video = document.getElementById("camera");
const captureBtn = document.getElementById("capture");
const countdown = document.getElementById("countdown");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frame = new Image();
frame.src = "assets/photostrip.png";

let photos = [];


// =========================
// START CAMERA
// =========================

async function startCamera() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        video.srcObject = stream;

    } catch (err) {

        alert("Unable to access camera.");
        console.error(err);

    }

}

startCamera();


// =========================
// WAIT FUNCTION
// =========================

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// =========================
// TAKE 3 PHOTOS
// =========================

captureBtn.addEventListener("click", startPhotostrip);

async function startPhotostrip() {

    photos = [];

    captureBtn.disabled = true;

    for (let photo = 1; photo <= 3; photo++) {

        // Countdown
        for (let i = 3; i >= 1; i--) {

            countdown.style.display = "block";
            countdown.innerText = i;

            await wait(1000);

        }

        countdown.innerText = "📸";

        await wait(600);

        countdown.style.display = "none";


        // Capture photo

        const tempCanvas = document.createElement("canvas");
       tempCanvas.width = 600;
tempCanvas.height = 600;

        const tempCtx = tempCanvas.getContext("2d");

      // Crop the center square from the webcam
const size = Math.min(video.videoWidth, video.videoHeight);

const sx = (video.videoWidth - size) / 2;
const sy = (video.videoHeight - size) / 2;

tempCtx.drawImage(
    video,
    sx,
    sy,
    size,
    size,
    0,
    0,
    tempCanvas.width,
    tempCanvas.height
);

        photos.push(tempCanvas.toDataURL("image/png"));

        console.log("Photo " + photo + " captured.");

        await wait(600);

    }

    captureBtn.disabled = false;

    createPhotostrip(photos);

}