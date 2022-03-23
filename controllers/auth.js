const mysql=require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});


const db = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'ba9e9a435785aa',
    password: '3baf3826',
    database: 'heroku_14a186278551e7b'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected..');
})

//CREATE USER i.e. Register
exports.register = async (req, res) => {
    const { fname, lname, email, username, password, passwordConfirm } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.query('SELECT user_email FROM players WHERE user_email =?', [email], async (err, results) => {
        if (err) throw err;
        console.log("-----> Search Results")
        console.log(results.length)
        if (results.length != 0) {
            console.log("-----> Email already in use")
            message="Email already in use"
            res.render('register.ejs')
            //res.sendStatus(409)
        }
        else if(password.length<8 || password.search(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/) < 0 || password.search(/[A-Z]/) < 0){
            message="Password needs to be at least 8 characters, have an uppercase letter, & include a special symbol like @, !, ?"
            res.render('register.ejs')
        }
        else if(password!=passwordConfirm){
            console.log("-----> Passwords do not match")
            message="Passwords do not match"
            res.render('register.ejs')
        }
        else {
            await db.query('INSERT INTO players SET ?', {
                user_firstname: fname, user_lastname: lname,
                user_email: email, username: username, user_password: hashedPassword
            },
                (err, results) => {
                    if (err) throw err;
                    console.log("-------> Created New user")
                    console.log(results.insertId)
                    res.redirect('/login')
                    //res.sendStatus(201)
                })
        }
    })// end of connection.query()
} //end of db.getConnection()
// end of app.post()

//LOGIN
exports.login = async( req, res) => {
    const username = req.body.username
    const password = req.body.password
    await db.query('SELECT * FROM players WHERE username =?', [username], async (err, results) => {
        if (err) throw err;
        console.log("-----> Search Results")
        
        console.log(results.length)

        if (results.length == 0) {
            console.log("-----> User does not exist")
            message="User does not exist"
            res.render('login')
        }
        else {
            const hashedPassword = results[0].user_password
            //get the hashedpassword from result
            if(await bcrypt.compare(password, hashedPassword)){
                console.log('-------> Login Successful')
                res.redirect('/')
            }
            else {
                console.log('-------> Password incorrect')
                message="Password Incorrect"
                res.render('login.ejs');
            } // end of bcrypt.compare()
        }// end of user exists 
    })// end of connection
}
