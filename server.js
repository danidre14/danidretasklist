if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");

//routes
const tasks = require("./routes/api/tasks");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Database Connected"));

app.use(express.json());

// Use Routes
app.use("/api/tasks", tasks);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  })
}

app.listen(process.env.PORT || 5000, () => console.log("Server Started"));
