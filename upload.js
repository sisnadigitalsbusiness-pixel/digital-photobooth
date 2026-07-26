const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzDC9D2ICPdXyvwyUorCf0NXq-sCxD2tlPYTTU2Rf_8bVQk5pR50q0t6ax7dX_MEypZ8w/exec";

async function uploadToDrive(imageData) {

    try {

        const filename = "Photostrip_" + Date.now() + ".png";

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            headers: {
                "Content-Type": "text/plain;charset=UTF-8"
            },

            body: JSON.stringify({

                filename: filename,
                image: imageData

            })

        });

        const text = await response.text();

        console.log("Drive Upload:", text);

    }

    catch (err) {

        console.error("Upload Error:", err);

    }

}