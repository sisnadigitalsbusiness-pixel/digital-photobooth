const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzDC9D2ICPdXyvwyUorCf0NXq-sCxD2tlPYTTU2Rf_8bVQk5pR50q0t6ax7dX_MEypZ8w/exec"
async function uploadToDrive(imageData) {

    try {

        const filename = "Photostrip_" + Date.now() + ".png";

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                filename: filename,
                image: imageData
            })
        });

        const result = await response.json();

        console.log("Upload Result:", result);

    } catch (err) {

        console.error("Upload Error:", err);

    }

}