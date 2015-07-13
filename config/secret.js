/**
 * New node file
 */
exports.key = "propertiesglv";
exports.mailid = "gntstechnologies@gmail.com";
exports.mailPassword = "GntS@2014!";

exports.facebook = {
		
    clientID: process.env.FACEBOOK_ID || '1612291259056681',
    clientSecret: process.env.FACEBOOK_SECRET || 'd59bfd5dd3eb9397642c038beaaa2e36',
    callbackURL: '/userSignInFacebook/callback',
    passReqToCallback: true
  }

exports.twitter = {
    consumerKey: process.env.TWITTER_KEY || 'Fipcw9vpOVqj1NA2caRVuebhR',
    consumerSecret: process.env.TWITTER_SECRET  || '6lIkFLRpsoekf5xA051MKcTutaNwXMz1VRJlCHrOTxjsFfPUzj',
    callbackURL: '/userSignInTwitter/callback',
    passReqToCallback: true
  }

exports.google = {
    clientID: process.env.GOOGLE_ID || '714611780397-mi9dhb23pdpcjlbs8gq66ucf89uqrgrq.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'h5TRd1RQGBqd64QJ5CRlzkiH',
    callbackURL: '/userSignInGoogle/callback',
    passReqToCallback: true
  }