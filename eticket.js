function openETicketWindow(source, destination, fare, passengerCount) {
    // Open a new window
    const ticketWindow = window.open("", "_blank", "width=600,height=800");

    // Add initial loader and ticket HTML content
    ticketWindow.document.write(`
        <html lang="en">
        <head>
            <title>E-Ticket</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script> <!-- Add html2canvas -->
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    margin: 0;
                    background: #e8f1f2;
                    color: #333;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    padding: 0;
                }
                .loader-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
                .loader {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #1e3c72;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin-bottom: 20px;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .loader-message {
                    font-size: 1.2rem;
                    color: #333;
                    font-weight: bold;
                }
                .ticket-container {
                    display: none;  /* Hide ticket initially */
                    width: 90%;
                    max-width: 600px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .header {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #1e3c72;
                    margin-bottom: 20px;
                }
                .journey-info {
                    font-size: 1.1rem;
                    margin: 10px 0;
                    width: 100%;
                    text-align: left;
                    padding: 10px;
                    background-color: #f5f5f5;
                    border-radius: 5px;
                }
                .journey-info span {
                    font-weight: bold;
                    color: #1e3c72;
                }
                .fare {
                    font-size: 1.4rem;
                    font-weight: bold;
                    color: #1e3c72;
                    margin-top: 30px;
                    border-top: 1px solid #ddd;
                    padding-top: 15px;
                    width: 100%;
                    text-align: center;
                }
                .qr-container {
                    margin-top: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
                .qr-container img {
                    border-radius: 10px;
                }
                .screenshot-button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #1e3c72;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }
                .screenshot-button:hover {
                    background-color: #304d6d;
                    transform: scale(1.05);
                }
                .screenshot-button:active {
                    transform: scale(0.95);
                }
                .screenshot-loader {
                    display: none;
                    width: 25px;
                    height: 25px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #fff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-left: 10px;
                }
            </style>
        </head>
        <body>
            <div class="loader-container">
                <div class="loader"></div>
                <div class="loader-message">Generating your E-Ticket...</div>
            </div>
            <div class="ticket-container" id="ticketContainer">
                <div class="header">E-Ticket</div>
                <div class="journey-info">
                    <span>Ticket Number:</span> Ticket-${Math.floor(Math.random() * 1000000)}
                </div>
                <div class="journey-info">
                    <span>Journey:</span> ${source} to ${destination}
                </div>
                <div class="journey-info">
                    <span>Passengers:</span> ${passengerCount}
                </div>
                <div class="fare">
                    Total Fare: ₹${fare}
                </div>
                <div class="qr-container" id="qrCode"></div>
                <button class="screenshot-button" id="screenshotButton">
                    Take Screenshot
                    <div class="screenshot-loader" id="screenshotLoader"></div>
                </button>
            </div>
        </body>
        </html>
    `);

    // Set a timeout to simulate the loading process
    setTimeout(() => {
        // Hide the loader and show the ticket container
        const ticketContainer = ticketWindow.document.getElementById("ticketContainer");
        const loaderContainer = ticketWindow.document.querySelector(".loader-container");

        loaderContainer.style.display = "none";  // Hide loader
        ticketContainer.style.display = "flex";  // Show ticket container

        // Define the journey details dynamically from user input
        const journeyDetails = {
            journey: `${source} to ${destination}`,
            ticketNumber: `Ticket-${Math.floor(Math.random() * 1000000)}`,
            passengers: passengerCount,
            fare: fare
        };

        // Convert the journey details to a JSON string (to encode in the QR code)
        const journeyData = JSON.stringify(journeyDetails);

        // Generate QR code with the journey details
        const qrCodeContainer = ticketWindow.document.getElementById("qrCode");

        new QRCode(qrCodeContainer, {
            text: journeyData, 
            width: 150,
            height: 150,
        });

        // Implement screenshot functionality
        const screenshotButton = ticketWindow.document.getElementById("screenshotButton");
        const screenshotLoader = ticketWindow.document.getElementById("screenshotLoader");

        screenshotButton.addEventListener("click", () => {
            screenshotLoader.style.display = "inline-block"; // Show loader during screenshot

            // Wait for the ticket content to be fully rendered
            setTimeout(() => {
                html2canvas(ticketWindow.document.body).then(canvas => { // Capture the whole screen
                    const dataUrl = canvas.toDataURL();
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = 'e-ticket.png';
                    link.click();
                    screenshotLoader.style.display = "none"; // Hide loader after screenshot is taken
                }).catch(error => {
                    console.error("Screenshot error:", error);
                    screenshotLoader.style.display = "none"; // Hide loader on error
                });
            }, 500); // Delay slightly to ensure all content is rendered
        });

    }, 3000);  // 3 seconds delay for generating ticket
}
