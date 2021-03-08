var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require("path");
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const fs = require('fs')
const multer = require('multer')
const admin = require("firebase-admin");

var { userModle, shopCartModel, sweetOrdersModel } = require("./dbrepo/models");
var authRoutes = require("./routes/auth")
console.log(userModle, shopCartModel, sweetOrdersModel)

var { SERVER_SECRET } = require("./core/index");

const PORT = process.env.PORT || 5000;


var app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/", express.static(path.resolve(path.join(__dirname, "public"))));
app.use('/', authRoutes)

app.use(function (req, res, next) {
    console.log('cookie', req.cookies)

    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    console.log("Asign value of token" , req.cookies.jToken)

    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        console.log("decodedData .................>>>>>>>>>>" , decodedData)
        if (!err) {
            const issueDate = decodedData.iat * 1000
            const nowDate = new Date().getTime()
            const diff = nowDate - issueDate

            if (diff > 30000) {
                res.status(401).send('Token Expired')

            } else {
                var token = jwt.sign({
                    id: decodedData.id,
                    name: decodedData.name,
                    email: decodedData.email,
                    role: decodedData.role
                }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                })
                req.body.jToken = decodedData
                req.headers.jToken = decodedData
                next()
            }
        } else {
            res.status(401).send('invalid Token')
        }

    });

})

<<<<<<< HEAD
 app.get("/profile", (req, res, next) => { 
=======
////// Get profile and user data in user interface
////// Get profile and user data in user interface
////// Get profile and user data in user interface

app.get('/profile', (req, res, next) => {
>>>>>>> b2c2665add4c871f4f646f9c2c9accc84ec03599

    console.log(req.body)


    userModle.findById(req.body.jToken.id, "name email phone role gender cratedOn",
        function (err, data) {
            console.log(data)
            if (!err) {
                res.send({
                    profile: data
                })
            } else {
                res.status(404).send({
                    message: "server err"
                })
            }

        })

})

//////Cart Upload Api
//////Cart Upload Api
//////Cart Upload Api
//////Cart Upload Api

const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})
var upload = multer({ storage: storage })

// const admin = require("firebase-admin");
// https://firebase.google.com/docs/storage/admin/start
var serviceAccount =  // create service account from here: https://console.firebase.google.com/u/0/project/delete-this-1329/settings/serviceaccounts/adminsdk
{
    "type": "service_account",
    "project_id": "auth-production-89fa8",
    "private_key_id": "0e299704d49dde4599c4f47f8d4219b2a014f17c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKiSxuok+VXrwq\npBklvs7o0dDDaexBJq9loYxo3VA5THX48cF+6fSHZgQWGTA8J6Ng0bf59nIppIWr\nLphYb/C6FS34YnCrnldXRM/EBI/BWXQhSwxV+9nj2nK7g4m3mJXMNtBndAMy9fff\nkGlrYskVf4Q4gjn7EQdAwx7efpP1IXdOcq9B2SDVb96Wwsh2s/RwBqMZ0gURgrwN\nbOQEP2SnnNVgUGnPCbAD93bKVaDy/DuI/rCodoxJhvp0D6ePuXYl33363xWGtq95\ntNrU6viF/Oltk/Jrk8E3NF0QoNlyABAG5mpEQxWGy/4c7Af8evF6Eq17/t9+7wpO\nSQ47j9SVAgMBAAECggEAGHaxMzvPuQ8UU2I212RQwbZ2LORicQwnK3Nz7katJf6i\nUUuCP74qlyAvZivss5dmGI+8VSj7aSRCMQcTx7rdrNxaDSJ20YPysMvS/K5AXu5b\nJJpYBxrAmtEMArJEtDRuA5irW5Obv1AOfKaI1Tu9Zidc5SZ1smnAIoZu+Bj57iXB\nqIX3oI5OyqZdEr3D1JHWeUGnOBVnRS5khOL3HO0euqfRyl0Ru5w3duiA5TC9rpai\nocXq/xnDraW1SigIYk+veuM9mdpqV1bMWqnRNgfBPl29rRfcnM0Bun1N8CeBNibd\n4KZ+YVG8JG7/aR6kjGkrgE913BmBKhABcJK8tuhvkQKBgQDpvbbR7Q4CbgCyaGWG\npv1LQbmtt5nfjJyOpZ3Ikj/t7L4aIDzbs8Dhv3YCwHyfnEaMWI9W2XetRp7JkXlX\n2Tz+E2UjCYJgjemkn+yOUyOugwMw57DRwde1OmMOG7fQivw7rv1gC+7P4EtFryva\nweqUU75hYxwJ4PYKj+pMkoq9DwKBgQDd0rf6nSvmXGbF88109jVVYtDjed8rQbVa\ntEbDfDWtEVQLgty0Pst8zNmulT4zKc/nk4Fvox5YPTPmYQ6IS8NtxQiiLxDEcClq\nAtkelvZFBwS3AiaY8d01yV1CntcjoEDit8C2JKm7CZ56VTxOgSNRVIs0TzyykzK1\neShiZjvcGwKBgFlcJSumhCebpHqQfNf4uXdu/iySt6oGWMgUOvk2KGiujJLyZjHc\nS85CYzx0GHDwzuvS46Hha+Z7zDLlgc17CN1dztmRRh3hw0Qju81Bra+G+M5WlXvr\nrqrjUoFPSXvZ1sp+gPGaPkeMyVovuQVeA2+HgI481LhWH9oz4PA7Sf0zAoGAQikm\nXKZiQJwQvzv/bMI+mBAYE7D24jT//WTFsmqqq8r+UUyfvVb5ZGjJCGxVF/eBniV9\ntqllVJY0k6MhLX/Dc0sQTydQjfaSM59T2O7X1zDHtDn8/yMsgm1j1on/yw1yLOz3\nmpwGz9WHoh8oFJYpzYk0185GYVDMEBpp9Cdf9T8CgYA2av8cPG9RFdn1VSmDciIc\nnOwyfrR5d1cClnzGqk8uNswPAr0zUHu0S+4Oqz1P3S9HErRPrF9PVn8SutiMGReq\nEdezadjz9PEAp1mQ8IcYA/PXE4PJXfzW7Lxh2sGqzuE1uHpEw+jPyiuhyVXS8zPq\niRLScDgq45eq+ouVaVq5OA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-clna5@auth-production-89fa8.iam.gserviceaccount.com",
    "client_id": "115557154223056350282",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-clna5%40auth-production-89fa8.iam.gserviceaccount.com"
  }
  
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://auth-production-89fa8-default-rtdb.firebaseio.com/"
});
const bucket = admin.storage().bucket("gs://auth-production-89fa8.appspot.com");



//==============================================

app.post("/uploadcart", upload.any(), (req, res, next) => {

    bucket.upload(
        req.files[0].path,

        function (err, file, apiResponse) {
            if (!err) {
                console.log("api resp: ", apiResponse);

                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
              
                    if (!err) {
                        // console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 
                        console.log(req.body.email)
                        console.log( "headerskdflasfjks ka data  ===================>>>>> " ,req.headers.jToken.id)
                        console.log( "headerskdflasfjks request headers  ===================>>>>> " ,req.headers)
                        userModle.findById(req.headers.jToken.id, 'email role', (err, users) => {
                            console.log("Adminperson ====> ", users.email)

                            if (!err) {
                                shopCartModel.create({
                                    "title": req.body.title,
                                    "price": req.body.price,
                                    "availability": req.body.availability,
                                    "cartimage": urlData[0],
                                    "description": req.body.description
                                })
                                    .then((data) => {
                                        console.log(data)
                                        res.send({
                                            status: 200,
                                            message: "Product add successfully",
                                            data: data
                                        })

                                    }).catch(() => {
                                        console.log(err);
                                        res.status(500).send({
                                            message: "Not added, " + err
                                        })
                                    })
                            }
                            else {
                                res.send({
                                    message: "error"
                                });
                            }
                        })
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });
})


////// Get Products frrom Database in user Interfase
////// Get Products frrom Database in user Interfase
////// Get Products frrom Database in user Interfase
////// Get Products frrom Database in user Interfase
////// Get Products frrom Database in user Interfase


app.get('/getProducts', (req, res, next) => {
    shopCartModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                data: data
            })
        }
        else {
            res.send(err)
        }
    })
})


/////// Save order in Database
/////// Save order in Database
/////// Save order in Database
/////// Save order in Database
/////// Save order in Database


app.post("/order", (req, res, next) => {
    console.log("fsfsf", req.body)
    if (!req.body.orders || !req.body.total) {

        res.status(403).send(`
            please send email and passwod in json body.
            e.g:
            {
                "orders": "order",
                "total": "12342",
            }`)
        return;
    }

    userModle.findOne({ email: req.body.jToken.email }, (err, user) => {
        console.log("afafa", user)
        if (!err) {
            sweetOrdersModel.create({
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                email: user.email,
                orders: req.body.orders,
                total: req.body.total
            }).then((data) => {
                res.status(200).send({
                    message: "Order have been submitted",
                    data: data
                })
            }).catch(() => {
                res.status(500).send({
                    message: "order submit error, " + err
                })
            })
        }
        else {
            console.log(err)
        }
    })
})


/////// Get all orders in Admin panel 
/////// Get all orders in Admin panel 
/////// Get all orders in Admin panel 
/////// Get all orders in Admin panel 
/////// Get all orders in Admin panel 


app.get('/getorders', (req, res, next) => {
    sweetOrdersModel.find({}, (err, data) => {
        console.log("dlfsdjlaskdfj data datat tatdta + ", data)
        if (!err) {
            res.send({
                data: data
            })
        }
        else {
            res.send(err)
        }
    })
})

app.listen(PORT, () => {
    console.log("surver is running on : ", PORT)
});







