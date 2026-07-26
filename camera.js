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

            audio:false

        });


        video.srcObject = stream;


    } catch(err) {

        console.error("Camera error:", err);

        alert(
            "Camera Error:\n\n" +
            err.name + "\n\n" +
            err.message
        );

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

captureBtn.addEventListener(
    "click",
    startPhotostrip
);



async function startPhotostrip() {


    photos = [];


    captureBtn.disabled = true;



    for(let photo = 1; photo <= 3; photo++){


        // COUNTDOWN

        for(let i = 3; i >= 1; i--){


            countdown.style.display = "block";

            countdown.innerText = i;


            await wait(1000);


        }



        countdown.innerText = "📸";


        await wait(600);


        countdown.style.display = "none";



        // CAPTURE PHOTO


        const tempCanvas = document.createElement("canvas");


        tempCanvas.width = 600;

        tempCanvas.height = 600;



        const tempCtx = tempCanvas.getContext("2d");



        const size = Math.min(
            video.videoWidth,
            video.videoHeight
        );



        const sx = 
        (video.videoWidth - size) / 2;



        const sy =
        (video.videoHeight - size) / 2;



        tempCtx.save();



        // mirror selfie

        tempCtx.translate(
            tempCanvas.width,
            0
        );


        tempCtx.scale(-1,1);



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



        tempCtx.restore();



        photos.push(
            tempCanvas.toDataURL("image/png")
        );



        console.log(
            "Photo " + photo + " captured."
        );



        await wait(600);


    }



    captureBtn.disabled = false;



    // CREATE FINAL PHOTO WITH FRAME

    createPhotostrip(photos);



    // WAIT FOR FINAL CANVAS THEN UPLOAD

    setTimeout(()=>{

        uploadPhoto();

    },1500);



}



// =========================
// UPLOAD TO GOOGLE DRIVE
// =========================


function uploadPhoto(){


    const image =
    canvas.toDataURL("image/png");



    fetch(
        "/.netlify/functions/upload",
        {

            method:"POST",


            headers:{

                "Content-Type":
                "application/json"

            },


            body:JSON.stringify({

                image:image

            })


        }

    )


    .then(response => response.json())


    .then(data=>{


        console.log(
            "Google Drive:",
            data
        );



        if(data.success){

            console.log(
                "Photo saved successfully!"
            );

        }


    })


    .catch(error=>{


        console.error(
            "Upload error:",
            error
        );


    });



}