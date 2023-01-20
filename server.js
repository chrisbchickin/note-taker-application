const express = require('express');
const app = express();
const Routes = require('./routes/routes');
const PORT = process.env.PORT || 3001;


// Folder to retrieve CSS and JS Files
app.use(express.static("public"));


// Middleware 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', Routes);


// Listening at this port
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;