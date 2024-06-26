const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

let items = [];

app.get("/", (req, res) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString('en-US', options);
    let todayISO = today.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format for the date input
    res.render('index', { day: day, items: items, today: todayISO });
});

app.post("/add", (req, res) => {
    let newItem = {
        text: req.body.addItem,
        date: req.body.dueDate,
        milestone: req.body.milestone ? true : false
    };
    items.push(newItem);
    res.redirect("/");
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});
