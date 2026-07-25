const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw70EVxaVNSPJKWqhrq4wsETzYZL53E_6QziKCgNeQ-_yFj3KrVVelAABFjxanIJME6Ig/exec";

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