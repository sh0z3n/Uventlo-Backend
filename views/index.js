const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Uventlo</title>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
          <style>
              body {
                  background-color: #724efe; /* Dark background */
                  color: #d4a5ff; /* Light purple text */
                  font-family: 'Roboto', sans-serif; /* New font */
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  text-align: center;
              }
              h1 {
                  font-size: 3em;
                  margin-bottom: 20px;
                  font-weight: 700;
                  background: linear-gradient(to right, #724efe, white); /* Gradient from purple to white */
                  -webkit-background-clip: text; /* Clip text to the background area */
                  -webkit-text-fill-color: transparent; /* Set text fill color to transparent */
              }
              .container {
                  background: #282828;
                  padding: 40px;
                  border-radius: 15px;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                  max-width: 600px;
                  width: 90%;
                  margin: auto;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
              }
              img {
                  max-width: 300px;
                  border-radius: 10px;
                  margin: 20px 0;
              }
              .btn {
                  background: linear-gradient(73deg, #fff, #724efe); /* Adjust button color */
                  color: #1a1a1a;
                  border: none;
                  padding: 15px 30px;
                  font-size: 1.2em;
                  border-radius: 5px;
                  cursor: pointer;
                  text-decoration: none;
                  display: inline-block;
                  transition: background 0.9s ease; /* Change transition to apply to background */
                  margin-top: 20px;
              }
              .btn:hover {
                  background: linear-gradient(45deg, #724efe, #724efe); /* Adjust button color on hover */
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to the Server Side of UVENTLO</h1>
              <img src="./Artboard_1 (1).png" alt="UVENTLO Logo">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="btn">Lunch Uventlo</a>
          </div>
      </body>
      </html>
    `);
  });
  

app.listen(5173, () => {
    console.log("Server is running on http://localhost:5173");
});