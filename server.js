const express = require('express');
const app = express();
const cors = require('cors');
const corsConfig = {
    origin:"https://waste-donation-backend.vercel.app/",
    credential : true,
    methods :['GET','POST','PUT','DELETE'],
};
app.options("",cors(corsConfig));
app.use(cors(corsConfig));

const passport = require('passport');
const dbConnect = require("./config/dbConnection.js");
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donor');
const agentRoutes = require('./routes/agent');

require("dotenv").config();
dbConnect();
require('./config/passport')(passport);


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride('_method'));
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    res.locals.currentUser = req.user;
    next();
});

//Routes
app.get('/', (req, res) => {
    res.send("Hello");
});
app.use('/api',authRoutes);
app.use('/api',donorRoutes);
app.use('/api',agentRoutes)

app.use((req,res)=>{
    res.status(404).json({message:"Page not found"});
});

const port = process.env.PORT || 4000;
app.listen(port,console.log(`Server is running on port ${port}`));
