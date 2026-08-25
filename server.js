/* =========================================================
   BHAVESH PROPERTY
   Real Estate Lead / Contact Backend
========================================================= */

require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs");
const { Resend } = require("resend");

const app = express();

/*
  Render provides PORT automatically.
  Local development falls back to 3000.
*/
const PORT = process.env.PORT || 3000;


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
  Serve all frontend files from this project directory.
*/
app.use(express.static(__dirname));


/* =========================================================
   BASIC HEALTH CHECK
========================================================= */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bhavesh Property server is running.",
    timestamp: new Date().toISOString()
  });
});


/* =========================================================
   HOME PAGE
========================================================= */

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "index.html")
  );
});


/* =========================================================
   EMAIL CONFIGURATION
========================================================= */

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const resendConfigured =
  Boolean(process.env.RESEND_API_KEY);

if (!resendConfigured) {
  console.warn(
    "⚠️ RESEND_API_KEY is not configured."
  );
}


/* =========================================================
   CONTACT FORM
========================================================= */

app.post("/submit-form", async (req, res) => {

  try {

    /*
      Read all expected values from the frontend.
    */

    const {
      name,
      email,
      phone,
      interest,
      budget,
      message
    } = req.body;


    /* =====================================================
       VALIDATION
    ===================================================== */

    const cleanName =
      String(name || "").trim();

    const cleanEmail =
      String(email || "").trim();

    const cleanPhone =
      String(phone || "").trim();

    const cleanInterest =
      String(interest || "").trim();

    const cleanBudget =
      String(budget || "").trim();

    const cleanMessage =
      String(message || "").trim();


    if (
      !cleanName ||
      !cleanEmail ||
      !cleanPhone ||
      !cleanInterest ||
      !cleanMessage
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Please fill in all required fields."
      });

    }


    /*
      Basic email validation.
    */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(cleanEmail)) {

      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address."
      });

    }


    /*
      Basic phone validation.
      We only require at least 10 digits so
      international formats remain possible.
    */

    const phoneDigits =
      cleanPhone.replace(/\D/g, "");


    if (phoneDigits.length < 10) {

      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid phone number."
      });

    }


    /* =====================================================
       FORMAT ENQUIRY
    ===================================================== */

    const enquiryTime =
      new Date().toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short"
        }
      );


    const enquiryText = `
NEW PROPERTY ENQUIRY
====================

Name:
${cleanName}

Email:
${cleanEmail}

Phone:
${cleanPhone}

Interested In:
${cleanInterest}

Budget:
${cleanBudget || "Not specified"}

Message:
${cleanMessage}

Received:
${enquiryTime}

====================
Bhavesh Property
`.trim();


    /* =====================================================
       SAVE LOCAL BACKUP
    ===================================================== */

    /*
      This is only a local backup.
      Cloud hosting files may not be permanent,
      so email should be considered the primary
      lead-delivery method.
    */

    const localLog = `
--------------------------------------------------
${enquiryText}
--------------------------------------------------

`;


    try {

      fs.appendFileSync(
        path.join(
          __dirname,
          "submissions.txt"
        ),
        localLog,
        "utf8"
      );

    } catch (fileError) {

      console.warn(
        "⚠️ Could not write local submission backup:",
        fileError.message
      );

    }


    /* =====================================================
       CHECK EMAIL CONFIGURATION
    ===================================================== */

    if (!resendConfigured) {
  console.error("❌ RESEND_API_KEY is missing.");

  return res.status(500).json({
    success: false,
    message:
      "The enquiry service is temporarily unavailable. Please contact us directly."
  });
}


    /* =====================================================
       EMAIL TO AGENT
    ===================================================== */

    const mailOptions = {

      /*
        Gmail sender account.
      */

      from: process.env.GMAIL_USER,

      /*
        Send enquiry to the same business email.
      */

      to: process.env.GMAIL_USER,

      /*
        Allow the agent to reply directly
        to the customer's email.
      */

      replyTo: cleanEmail,

      subject:
        `New Property Enquiry — ${cleanName}`,

      text:
        enquiryText,

      html: `
        <!DOCTYPE html>

        <html>
        <head>
          <meta charset="UTF-8">

          <style>

            body {
              margin: 0;
              padding: 0;
              background: #f5f6f8;
              font-family: Arial, sans-serif;
              color: #1f2937;
            }

            .wrapper {
              padding: 30px 15px;
            }

            .card {
              max-width: 650px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 14px;
              overflow: hidden;
              box-shadow:
                0 10px 30px
                rgba(15, 23, 42, 0.08);
            }

            .header {
              padding: 28px;
              background: #0f172a;
              color: #ffffff;
            }

            .header h1 {
              margin: 0;
              font-size: 24px;
            }

            .header p {
              margin: 8px 0 0;
              color: #cbd5e1;
              font-size: 14px;
            }

            .content {
              padding: 30px;
            }

            .row {
              margin-bottom: 20px;
            }

            .label {
              margin-bottom: 5px;
              color: #9ca3af;
              font-size: 11px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
            }

            .value {
              color: #111827;
              font-size: 15px;
              line-height: 1.5;
            }

            .message-box {
              margin-top: 8px;
              padding: 16px;
              background: #f8fafc;
              border-left:
                4px solid #c89b5b;
              border-radius: 8px;
            }

            .footer {
              padding: 20px 30px;
              border-top: 1px solid #e5e7eb;
              color: #9ca3af;
              font-size: 11px;
            }

            a {
              color: #a97a3d;
            }

          </style>

        </head>

        <body>

          <div class="wrapper">

            <div class="card">

              <div class="header">

                <h1>
                  New Property Enquiry
                </h1>

                <p>
                  Bhavesh Property
                </p>

              </div>


              <div class="content">

                <div class="row">

                  <div class="label">
                    Customer
                  </div>

                  <div class="value">
                    <strong>
                      ${escapeHtml(cleanName)}
                    </strong>
                  </div>

                </div>


                <div class="row">

                  <div class="label">
                    Email
                  </div>

                  <div class="value">
                    <a href="mailto:${escapeHtml(cleanEmail)}">
                      ${escapeHtml(cleanEmail)}
                    </a>
                  </div>

                </div>


                <div class="row">

                  <div class="label">
                    Phone
                  </div>

                  <div class="value">
                    <a href="tel:${escapeHtml(cleanPhone)}">
                      ${escapeHtml(cleanPhone)}
                    </a>
                  </div>

                </div>


                <div class="row">

                  <div class="label">
                    Interested In
                  </div>

                  <div class="value">
                    ${escapeHtml(cleanInterest)}
                  </div>

                </div>


                <div class="row">

                  <div class="label">
                    Budget
                  </div>

                  <div class="value">
                    ${escapeHtml(
                      cleanBudget ||
                      "Not specified"
                    )}
                  </div>

                </div>


                <div class="row">

                  <div class="label">
                    Customer Message
                  </div>

                  <div class="message-box">

                    ${escapeHtml(
                      cleanMessage
                    ).replace(
                      /\n/g,
                      "<br>"
                    )}

                  </div>

                </div>


              </div>


              <div class="footer">

                Received:
                ${escapeHtml(enquiryTime)}

                <br><br>

                Reply directly to this email
                to contact the customer.

              </div>

            </div>

          </div>

        </body>

        </html>
      `
    };


    /* =====================================================
       SEND EMAIL
    ===================================================== */

    const { data, error } = await resend.emails.send({
  from: "Bhavesh Property <onboarding@resend.dev>",

  to: [
    "dbpatel180608@gmail.com"
  ],

  replyTo: cleanEmail,

  subject: `New Property Enquiry — ${cleanName}`,

  text: enquiryText,

  html: mailOptions.html
});

if (error) {
  console.error(
    "❌ Resend email error:",
    error
  );

  return res.status(500).json({
    success: false,
    message:
      "Unable to send your enquiry right now. Please try again."
  });
}

console.log(
  "✅ Property enquiry email sent:",
  data.id
);


    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message:
        "Your enquiry has been sent successfully.",

      enquiryId:
        data.id

    });


  } catch (error) {

    console.error(
      "❌ Contact form error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Unable to process your enquiry right now. Please try again or contact us directly."

    });

  }

});


/* =========================================================
   HTML ESCAPE HELPER
========================================================= */

function escapeHtml(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {

  if (
    req.path.startsWith("/api") ||
    req.path === "/submit-form"
  ) {

    return res.status(404).json({
      success: false,
      message: "Endpoint not found."
    });

  }


  res.status(404).send(
    "Page not found."
  );

});


/* =========================================================
   ERROR HANDLER
========================================================= */

app.use(
  (err, req, res, next) => {

    console.error(
      "Unhandled server error:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "An unexpected server error occurred."

    });

  }
);


/* =========================================================
   START SERVER
========================================================= */

app.listen(
  PORT,
  () => {

    console.log(
      `✅ Bhavesh Property server running on port ${PORT}`
    );

    console.log(
      `🌐 Local URL: http://localhost:${PORT}`
    );

  console.log(
  `📧 Email service: ${
    resendConfigured
      ? "Resend configured"
      : "RESEND_API_KEY NOT CONFIGURED"
  }`
);

  }
);