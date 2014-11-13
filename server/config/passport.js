'use strict';
var mongoose = require('mongoose'), LocalStrategy = require('passport-local').Strategy, User = mongoose.model('User'), SamlStrategy = require('./passport-saml/index').Strategy, fs = require('fs'), config = require('./config')

var users = [];

module.exports = function (passport) {


    passport.serializeUser(function (user, done) {
        done(null, user.QID)
    })

    passport.deserializeUser(function (QID, done) {
        User.findOne({QID: QID}, function (err, user) {
            done(err, user)
        })
    })


    passport.use(new SamlStrategy(
        {
            path: config.sso.path,
            entryPoint: config.sso.entryPoint,
            issuer: config.sso.issuer,
            protocol: config.sso.protocol,
            logging: config.sso.logging,
            callbackUrl: config.sso.callbackUrl,
            cert: config.sso.cert,
            privateCert: config.sso.privateCert,
            encryptedSAML: config.sso.encryptedSAML,
            identifierFormat: config.sso.identifierFormat

        },
        function (profile, done) {

            if (!profile.QID) {
                return done(new Error("No QID found"), null);
            }

            process.nextTick(function () {

                User.findOne({QID: profile.QID}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        user = new User({

                            name: profile.DisplayName,
                            email: profile.Email,
                            username: profile.Corpid,
                            QID: profile.QID,
                            provider: 'SSO',
                            SSO: profile

                        })
                        user.save(function (err) {
                            if (err) console.log(err)
                            return done(null, user)

                        })

                    }
                    else {

                        return done(null, user);
                    }
                })
            })
        }
    ));


    // use local strategy

//    // serialize sessions
//    passport.serializeUser(function(user, done) {
//        done(null, user.id)
//    })
////
//    passport.deserializeUser(function(id, done) {
//        User.findOne({ _id: id }, function (err, user) {
//            done(err, user)
//        })
//   })

    // use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            User.findOne({email: email}, function (err, user) {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false, {message: 'Unknown user'})
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {message: 'Invalid password'})
                }
                return done(null, user)
            })
        }
    ))

}