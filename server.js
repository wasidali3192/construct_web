// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const port = process.env.PORT || '3000';

// Create Express app
const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Set up MongoDB connection
const dbURI = 'mongodb+srv://wasidali353:civilEng123@civil.ef7obpu.mongodb.net/';

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Define schema and model for contacts
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  comment: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// Serve static files
app.use(express.static('public'));

// Parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/public/commercial.html', (req, res) => {
  res.sendFile(__dirname + '/public/commercial.html');
});

app.get('/public/services.html', (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});

app.get('/public/renov.html', (req, res) => {
  res.sendFile(__dirname + '/public/renov.html');
});

// when requested by user it would retrive and display all data

app.get('/admin', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10; // Number of contacts to display per page


  Contact.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .then((contacts) => {
      Contact.countDocuments().then((count) => {
        const totalPages = Math.ceil(count / perPage);
        res.render('admin', { contacts, page, totalPages });
      });
    })
    .catch((err) => {
      console.log('Error retrieving contacts:', err);
      res.status(500).send('Internal Server Error');
    });
});


// added last night for sign in purpose

//Recieving user response from client side then saving it to database

app.post('/contacts', (req, res) => {
  const { name, email, phone, comment } = req.body;
  const contact = new Contact({ name, email, phone, comment });

  contact.save()
    .then((savedContact) => {
      res.json(savedContact);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred. Please try again later.' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
