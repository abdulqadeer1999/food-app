var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require("morgan");
var { foodUserModel, foodOrderModel, foodOrderModel } = require('./dbrepo/models')
var path = require("path")
var SERVER_SECRET = process.env.SECRET || "1234";
var jwt = require('jsonwebtoken')
var app = express()
var authRoutes = require('./routes/auth')
const admin = require("firebase-admin");
const multer = require('multer')






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
        "project_id": "twitter-chat-d564a",
        "private_key_id": "6ddd83d04d63b4f0677b7c4c141c2d21b7d8a0e2",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnAbZ2JkfNc1QU\ndG9zQwF9wxrtjsE1wRzwoxcS5y9j7i5nTYXzChrviGjNmCRfPu/NgxWdjArQW30A\naBZCelyd4781PMMgZfkGUz/2NViz7zUBKu+qJDXBl4SVqtuM0M5clsJINAdJFJ+r\nfwOCs9Pw1pRJ4q/wemcHh6iAOnho1ez2RZswdq/YHlI9HnfPbZnu2tZvftowETmp\nuE7NByKhI0k2hZ7XFeEkT52htqTL5rzZV7FiBJVUpK7EVyhOTV79kA4Ur2BBjg8f\nwy+StsTtN2AYoLbsHY7vd1H1ZjeKW4FO9N+58hfu2IxpVn0ML1qvc8ykZpTb8vlv\nj9QNL5WTAgMBAAECggEAEv22Xnwe6SWGt6a/77b8ae0wWDhGD1NM865QFuW0NWRl\n4Xhm1YreIkP8SvjUlgIlqdSQtjAxIJ1uuwebFGcutgOqgCbPN5Vw+n+oA9rwIdH/\nUIkt5MamWEPfH1flDH/IH65DHIvSEkTmnU1dvFSvsrDr/vTotettYOVTy3UasS0H\ncyE0ej7hoaZyk66kTVoMDvsa5LmwHDOEvTXG0HzxcGT8P1WGEpZ/znk5eCruyfWx\niW6kOSHxOtHtugM9MC69cu7cIoQf5KslV/UOkg8pLw4FgGNbmF5Jh5tKcOzdyUOu\nVkH7nDoFyEfkbTIKg0XfwLr6uaf4yST3gCPUjTRsyQKBgQDSg2YkdEAeYGkwkrfK\nNhRBYY4q4SHcUC0W5vaPU6qrvC7qGFgrJQVORkuFeif5ahWmjmuJ/f7qrQ6RYMOm\nU6cieZ9gge4EmBep8JGy8kpnKnW/AiRHVHsbL3QeY5ZVKY2y+zWCV1LM9esrSdLy\nuREeLOYskxR8pD8Mog71PpzAKQKBgQDLF7wUJly8fbL1qF3rT4RW0PcScV5JFvOC\nhfAjUrC/MP4sgg+Esgcl49ZgEmIikPJfiqeIWpZORq1VmzEETx7jrZR6V9oPOJ5T\n5v28eyChoXaa35ki+2koitxU7x2c81QqfiAiwhz3HIalW6420vV2AoCXM1JATRPc\nsEJp8anvWwKBgQCcLHdenA/leUkQjAhlr/EfACzkitkABUsuLnLEqiF3/sgfS6g9\ned2R0Hy+rX1yf81IH2iQmyq/F1wzZkI/5tebr/cZNctLBTqpDJxK0Y15M/relcws\nTvR1mqLe2Kryyz0gh1WPORFolRi+qKojAEE+zbiFYShVv9Q2nxPRxX2s4QKBgQCL\nkX4RIuPsLT4FEHWqtnSt7OE+bWZsODeUZVNIExWf7p1eHOtpN6ct5Mt4Lmn+czn9\nap4DWK2ekXehMwuWeIEz2iAFi8YxW6mC42VQWBVuvjVx7WOh5MC5ueP9Am6JY7dd\nlFulR1z8fUAS91RcHNHPDZ0tS3mk8tNJgF/Dyu4LrQKBgEYTa6x4MoGjWTLB0P80\nUR3oLIcV92vNauVuKc9eKx7IDjqqHdow4snp5FfsahgehAKuuPxRaKFg42nMPFDy\ngbv6iVSPZatO7PZkigt3ySylz2ihWAJQjDMYVj8XCDTAmzJV5FOkDSK8CpB5a6kA\ntikcXKgKBkD2LFiBFD5Nm+KU\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-lhfe2@twitter-chat-d564a.iam.gserviceaccount.com",
        "client_id": "108969986213665090568",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lhfe2%40twitter-chat-d564a.iam.gserviceaccount.com"
      };
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twitter-chat-d564a-default-rtdb.firebaseio.com/"
});
const bucket = admin.storage().bucket("gs://twitter-chat-d564a.appspot.com");



app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(morgan('dev'));
// app.use("/", express.static(path.resolve(path.join(__dirname, "public")));

app.get('/', (req, res, next) => {
    res.send("running")

})

app.use('/', authRoutes);
app.use(function (req, res, next) {
    console.log(req.cookies.jToken)
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {

            const issueDate = decodedData.iat * 1000;
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate;

            if (diff > 300000) {
                res.status(401).send("token expired")
            } else {
                var token = jwt.sign({
                    id: decodedData.id,
                    name: decodedData.name,
                    email: decodedData.email,
                    role: decodedData.role
                }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86400000,
                    httpOnly: true
                });
                req.body.jToken = decodedData
                req.headers.jToken = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})

 app.get("/profile", (req, res, next) => {

    console.log(req.body)

    foodUserModel.findById(req.body.jToken.id, 'name email phone role createdOn',
         function (err, doc) {
             console.log("doc", doc)
            if (!err) {
                res.send({
                    status: 200,
                    profile: doc
              })

             } else {
                 res.status(500).send({
                     message: "server error"
                 })
             }
         })
 });

   
app.post("/addProduct", upload.any(), (req, res, next) => {

    console.log("req.body: ", req.body);
    bucket.upload(
        req.files[0].path,
        function (err, file, apiResponse) {
            if (!err) {
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0])
                        foodUserModel.findById(req.headers.jToken.id, 'email role', (err,user)=>{
                            console.log("user =======>", user.email)
                            if (!err) {
                                foodProductModel.create({
                                    "name": req.body.productName,
                                    "price": req.body.price,
                                   "stock": req.body.stock,
                                   "image": urlData[0],
                                   "description": req.body.description
                                }).then((data) => {
                                    console.log(data)
                                    res.send({
                                        status: 200,
                                        message: "Product add successfully",
                                        data: data
                                    })

                                }).catch(() => {
                                    console.log(err);
                                    res.status(500).send({
                                        message: "user create error, " + err
                                    })
                                })
                            }
                            else{
                                res.send("err")
                            }
                        })
                        try {
                            fs.unlinkSync(req.files[0].path)
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

    foodUserModel.findOne({ email: req.body.jToken.email }, (err, user) => {
        console.log("afafa", user)
        if (!err) {
            foodOrderModel.create({
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                total: req.body.total,
                orders: req.body.orders
            }).then((data) => {
                res.send({
                    status: 200,
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

app.get('/getOrders', (req, res, next) => {
    foodOrderModel.find({}, (err, data) => {
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
app.get('/getProducts', (req, res, next) => {
    foodProductModel.find({}, (err, data) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})

