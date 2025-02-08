const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.render('index', { title: 'My Notes App', notes ,currentRoute: '/about'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/about', async (req, res) => {
    res.render('about', { title: 'About My Notes App', currentRoute: '/about' });
});

// Add a new note
router.post('/add', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({
            title,
            content,
        });
        await newNote.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete a note
router.post('/delete/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/'); // Redirect to the home page
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

// async function insertSampleNotes() {
//     try {
//         await Note.insertMany([
//             {
//                 title: "Meeting Notes",
//                 content: "Discussed project timelines and deliverables."
//             },
//             {
//                 title: "Grocery List",
//                 content: "Milk, Eggs, Bread, Butter, Fruits."
//             },
//             {
//                 title: "Workout Plan",
//                 content: "Monday: Chest, Tuesday: Back, Wednesday: Legs."
//             },
//             {
//                 title: "Book Recommendations",
//                 content: "1. The Great Gatsby, 2. To Kill a Mockingbird, 3. 1984."
//             },
//             {
//                 title: "Travel Plans",
//                 content: "Visit Paris in June, book flights and accommodation."
//             },
//             {
//                 title: "Project Ideas",
//                 content: "1. Build a personal website, 2. Create a weather app."
//             },
//             {
//                 title: "Learning Goals",
//                 content: "Learn React, improve JavaScript skills, understand TypeScript."
//             },
//             {
//                 title: "Daily Journal",
//                 content: "Today was productive. Completed all tasks on my list."
//             },
//             {
//                 title: "Movie Watchlist",
//                 content: "1. Inception, 2. The Matrix, 3. Interstellar."
//             },
//             {
//                 title: "Cooking Recipes",
//                 content: "1. Spaghetti Bolognese, 2. Chicken Curry, 3. Tacos."
//             },
//         ]);
//         console.log("Sample notes inserted successfully.");
//     } catch (error) {
//         console.error("Error inserting sample notes:", error);
//     }
// }

// // Call the function to insert sample notes
// insertSampleNotes();