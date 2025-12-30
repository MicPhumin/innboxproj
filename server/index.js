import express from "express";
import cors from "cors";
import mysql from "mysql2";
import userRoutes from "./route/userRoute.js"
import authRoutes from "./route/authRoute.js";

const index = express();
index.use(cors());
index.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "innboxproj"
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL Connected");
});

// API to get users
index.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

index.post()

index.listen(5000, () => {
  console.log('Server running on port 5000')
})


// index.use("/api/users", userRoutes);
// index.use("/api/auth", authRoutes);


export default index;
