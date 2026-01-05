import express from "express";
import cors from "cors";
import mysql from "mysql2";
import multer from "multer";
import fs from "fs";
import path from "path";

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
})

const uploadDir = path.join(process.cwd(), "uploadImage");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

index.use("/uploadImage", express.static("uploadImage"));

const upload = multer({ storage });

index.patch("/api/users/uploadImage",upload.single("image"), (req,res)=>{
  try {
    const imagePath = `/uploadImage/${req.file.originalname}`;
  
    db.query("UPDATE users SET qrImage = ? WHERE roomId = ?",[imagePath,req.body.id],()=>{ return res.json({
      name:req.file.originalname,
      url:`http://localhost:5000${imagePath}`,
      thumbUrl:`http://localhost:5000${imagePath}`,
      status:"done"

    })})
  } catch (error) {
    console.log("error API=>",error);
    res.status(500).json({ message: "Upload Image error" });
    return res.json({
       name:req.file.filename,
      status:"error"
    })
  }
})

index.listen(5000, () => {
  console.log('Server running on port 5000')
})


// index.use("/api/users", userRoutes);
// index.use("/api/auth", authRoutes);


export default index;
