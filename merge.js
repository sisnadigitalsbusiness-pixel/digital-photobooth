// ===============================
// MERGE 3 PHOTOS INTO PHOTOSTRIP
// ===============================

async function createPhotostrip(photos) {

    const frame = new Image();
    frame.src = "assets/photostrip.png";

    frame.onload = function () {

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = frame.width;
        canvas.height = frame.height;

        // White background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Photo positions for 639 x 1758 frame
        const boxes = [

            {
                x: 52,
                y: 42,
                w: 525,
                h: 470
            },

            {
                x: 52,
                y: 554,
                w: 525,
                h: 470
            },

            {
                x: 52,
                y: 1066,
                w: 525,
                h: 470
            }

        ];

        let loaded = 0;

        photos.forEach((src, index) => {

            const img = new Image();

            img.onload = function () {

                const b = boxes[index];

                ctx.save();

                // Clip to photo box
                ctx.beginPath();
                ctx.rect(b.x, b.y, b.w, b.h);
                ctx.clip();

                // Fill the box completely
                const scale = Math.max(
                    b.w / img.width,
                    b.h / img.height
                );

                const drawWidth = img.width * scale;
                const drawHeight = img.height * scale;

                const drawX = b.x + (b.w - drawWidth) / 2;
                const drawY = b.y + (b.h - drawHeight) / 2;

                ctx.drawImage(
                    img,
                    drawX,
                    drawY,
                    drawWidth,
                    drawHeight
                );

                ctx.restore();

                loaded++;

                if (loaded === photos.length) {

                    // Draw frame on top
                    ctx.drawImage(frame, 0, 0);

                    downloadStrip(canvas);

                }

            };

            img.src = src;

        });

    };

}

// ===============================
// DOWNLOAD IMAGE
// ===============================

function downloadStrip(canvas) {

    const link = document.createElement("a");

    link.download = "Photostrip.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

}