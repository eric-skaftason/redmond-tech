require('dotenv').config( { path: 'backend/.env' } ); // reads .env file located within
const app = require('./app.js');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(
        `-------- Redmond Tech Team Website Server --------\n` + 
        `Server running on http://localhost:${PORT}`
    );
});