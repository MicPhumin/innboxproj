import express from "express";
import cors from "cors";
import mysql from "mysql2";
import userRoutes from "./route/userRoute.js"
import authRoutes from "./route/authRoute.js";
import { message } from "antd";

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
const users = index.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

index.patch("/api/users/reserve", (req,res)=>{
  try {
    console.log("req.body api",req.body);
 db.query(`
    UPDATE users
    SET firstName = ?, lastName = ?, tel = ?, email = ?, note = ?, date = ?, isActive = ? WHERE roomId = ?
    `,[req.body.firstName, req.body.lastName, req.body.tel, req.body.email, req.body.note, req.body.date, req.body.isActive, req.body.roomId],
      (err,data)=>{
        return res.json({ message: "Reserve Complete" });
    })

  } catch (error) {
     console.log("error API=>",error);
    res.status(500).json({ message: "Server error" });
  }
   
  // const { id } = req.params;
  // const { name } = req.body;
  // db.query("UPDATE users SET ",(err,data)=>{
  //   console.log("users from api ", users);
  //   console.log("users from id ", id,name);
  // })
  //  return res.json({ message:"reserve successsfully",users})
})

index.listen(5000, () => {
  console.log('Server running on port 5000')
})


// index.use("/api/users", userRoutes);
// index.use("/api/auth", authRoutes);


export default index;
