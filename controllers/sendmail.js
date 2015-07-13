var secret = require("../config/secret");
mailer = require("nodemailer");

exports.sendMail = function(req, res, msg, sub) {

	var smtpTransport = mailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: secret.mailid,
            pass: secret.mailPassword
        }
    });
	
	var mail = {
	        from: "GLV <"+secret.mailid+">",
	        to: req.param("email"),
	        subject: sub,
	        text: "Example Text",
	        html: msg
	    }
	
	smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error+"console error");
            smtpTransport.close();
            res.send(error)
            
        }else{
            console.log("Message sent: " + response.message);
            smtpTransport.close();
            res.send(response.message)
            
        }

        
    });

};