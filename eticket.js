function openETicketWindow(source, destination, fare, passengerCount) {
    // Open a new window
    const ticketWindow = window.open("", "_blank", "width=600,height=800");

    // Add initial loader
    ticketWindow.document.write(`
        <html lang="en">
        <head>
            <title>E-Ticket</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
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
                .ticket-container {
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
            </style>
        </head>
        <body>
            <div class="ticket-container">
                <div class="header">E-Ticket</div>
                <div class="journey-info">
                    <span>Ticket Number:</span> Ticket-${Math.floor(Math.random() * 1000000)}
                </div>
                <div class="journey-info">
                    <span>Passengers:</span> ${passengerCount}
                </div>
                <div class="fare">
                    Total Fare: ₹${fare}
                </div>
                <div class="qr-container" id="qrCode"></div>
            </div>
        </body>
        </html>
    `);

    setTimeout(() => {
        const journeyDetails = {
            ticketNumber: `Ticket-${Math.floor(Math.random() * 1000000)}`,
            passengers: passengerCount,
            fare: fare
        };

        const journeyData = JSON.stringify(journeyDetails);

        const qrCodeContainer = ticketWindow.document.getElementById("qrCode");

        new QRCode(qrCodeContainer, {
            text: journeyData, 
            width: 150,
            height: 150,
        });
    }, 0);  
}
