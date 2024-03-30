const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports  = function(passport) {
    passport.use("local",
        new LocalStrategy({usernameField:'email' , passwordField:'password'},(email,password,done)=>{
            User.findOne({email:email}).then(user=>{
                if(!user)
                    return done (null,false,{message :"Email is not registered"});

                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(!isMatch)
                        return done(null,false,{message:'Password is incorrect'});
                    else
                        return done(null,user,{message :'Logged in successfully'});
                })
            })
            .catch(err=>console.log(err));
        })
    );

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
    
}