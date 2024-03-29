require("dotenv").config();

const express = require("express");
const app = express()
const cors = require("cors");
const authroute = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require("./router/admin-router")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// handle CORS
const corsOptions = {
  origin: '*',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authroute);
app.use("/form", contactRoute);
app.use("/data", serviceRoute);
app.use("/admin", adminRoute); // Use adminMiddleware here
app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  });
});
