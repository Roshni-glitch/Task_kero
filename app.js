require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo'); // Import connect-mongo
const Task = require('./models/task'); // Import Task model
const User = require('./models/user'); // Import User model
const wrapAsync = require('./utils/wrapasync'); // Import wrapAsync
const expressError = require('./utils/ExpressError'); // Import expressError
const { taskSchema } = require('./schema'); // Import taskSchema
const { isLoggedIn } = require('./middleware');
require('./config/db'); // Database connection
require('./config/passport'); // Google OAuth setup
const engine = require('ejs-mate');

const app = express();

// Set EJS as the view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//console.log(process.env.CALLBACK_URL);
// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static("public"));

// **Session Middleware (Using connect-mongo)**
const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // Use your MongoDB URI
    collectionName: 'sessions',
    crypto: { secret: process.env.SECRET || 'your_secret_key' },
    touchAfter: 24 * 3600 // Reduce session update frequency (in seconds)
});

app.use(session({
    store: sessionStore,
    secret: process.env.SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Prevents client-side JS from accessing cookies
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days expiration
    }
}));

// **Passport Middleware**
app.use(passport.initialize());
app.use(passport.session());

// **Make user available in all views**
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// **Validate Task Schema**
const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) throw new expressError(error.message, 400);
    next();
};

// **Task Routes**
app.get('/tasks', isLoggedIn, wrapAsync(async (req, res) => {
    const tasks = await Task.find({ user: req.user._id }).populate('user');
    res.render('home.ejs', { tasks });
}));

app.get('/tasks/new', isLoggedIn, (req, res) => {
    res.render('new.ejs');
});

app.post('/tasks', isLoggedIn, validateTask, wrapAsync(async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;
    if (!req.user || !req.user._id) {
        throw new expressError("User authentication failed!", 401);
    }
    const task = new Task({ title, description, status, priority, dueDate, user: req.user._id });
    await task.save();
    res.redirect('/tasks');
}));

app.get('/tasks/:id/edit', isLoggedIn, wrapAsync(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) throw new expressError("Unauthorized access!", 403);
    res.render('edit.ejs', { task });
}));

app.put('/tasks/:id', isLoggedIn, validateTask, wrapAsync(async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body
    );
    if (!task) throw new expressError("Unauthorized access!", 403);
    res.redirect('/tasks');
}));

app.delete('/tasks/:id', isLoggedIn, wrapAsync(async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) throw new expressError("Unauthorized access!", 403);
    res.redirect('/tasks');
}));

app.get('/tasks/:id', isLoggedIn, wrapAsync(async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('show.ejs', { task });
}));

// **Google OAuth Login**
app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// **Google OAuth Callback**
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => res.redirect('/tasks')
);

// **Logout**
app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// **Home Route**
app.get('/', (req, res) => {
    res.render('landing', { user: req.user });
});

// **Error Handling Middleware**
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    res.status(statusCode).send(message);
});

// **Start Server**
app.listen(3000, () => {
    console.log('🚀 Server running on port 3000');
});
