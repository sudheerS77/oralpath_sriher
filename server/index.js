require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

//configs
const routeConfig = require("./config/route.config");

//DataBase connection
const ConnectDB = require("./database/connection");

//Microservices Routes
const Auth = require("./API/Authentication/index");
const Projects = require("./API/Project/index");
const photos = require("./API/Gallery/index");
const Events = require("./API/Events/index");
const Brochure = require("./API/Brochure/brochure");
const Slider = require("./API/slider");
const Achievememts = require("./API/Achievements/index");
const Faculty = require("./API/Faculty/index");
const PgStudents = require("./API/PGStudents/index");
const User = require("./API/User/index");
const Feedback = require("./API/Feedback/index");
const Payment = require("./API/Payments/index");

const app = express();

//Application Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// app.use(session({
//   cookie:{
//       secure: true,
//       maxAge:60000
//          },
//   //store: new RedisStore(),
//   secret: 'secret',
//   saveUninitialized: true,
//   resave: false
//   }));

//passport configuration
routeConfig(passport);

//Application Routes
app.use("/auth", Auth);
app.use("/projects", Projects);
app.use("/photos", photos);
app.use("/events", Events);
app.use("/brochure", Brochure);
app.use("/faculty", Faculty);
app.use("/pg", PgStudents);
app.use("/slider", Slider);
app.use("/achievements", Achievememts);
app.use("/user", User);
app.use("/feedback", Feedback);
app.use("/payment", Payment);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

app.listen(8080, () =>
  ConnectDB()
    .then(() => console.log("Server is running \n DB connected"))
    .catch(() => console.log("Server is running DB didnt connected"))
);
