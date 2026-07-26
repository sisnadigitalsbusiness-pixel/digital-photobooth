const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzDC9D2ICPdXyvwyUorCf0NXq-sCxD2tlPYTTU2Rf_8bVQk5pR50q0t6ax7dX_MEypZ8w/exec";

async function uploadToDrive(imageData) {

    const filename = "Photostrip_" + Date.now() + ".png";

    try {

        console.log("Uploading to Drive...");

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

        console.log("Server Response:", text);

        alert("UPLOAD RESPONSE:\n\n" + text);

    } catch (err) {

        console.error("Upload Error:", err);

        alert("UPLOAD FAILED:\n\n" + err);

    }

}