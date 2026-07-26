const { google } = require("googleapis");
const { Readable } = require("stream");


exports.handler = async (event) => {

  try {

    const body = JSON.parse(event.body);

    const image = body.image;


    const buffer = Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );


    const auth = new google.auth.GoogleAuth({

      credentials: {

        client_email: process.env.GOOGLE_CLIENT_EMAIL,

        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")

      },

      scopes: [
        "https://www.googleapis.com/auth/drive"
      ]

    });



    const drive = google.drive({

      version: "v3",

      auth

    });



    await drive.files.create({

      requestBody: {

        name: `photobooth-${Date.now()}.png`,

        parents: [
          process.env.GOOGLE_FOLDER_ID
        ]

      },


      media: {

        mimeType: "image/png",

        body: Readable.from(buffer)

      }

    });



    return {

      statusCode: 200,

      body: JSON.stringify({

        success: true,

        message: "Photo saved!"

      })

    };


  } catch(error) {


    return {

      statusCode: 500,

      body: JSON.stringify({

        success:false,

        error:error.message

      })

    };


  }

};