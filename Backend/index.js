import dotenv from "dotenv"
dotenv.config({quiet:true})

import e from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collectionName, connection } from "./dbconfig.js";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = e();
app.use(e.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());


// app.post("/signup", async (req, res) => {
//   const useData = req.body;
//   if (useData.email && useData.password) {
//     const db = await connection();
//     const collection = await db.collection("user");

//     const result = await collection.insertOne(useData);
//     if (result) {
//       jwt.sign(useData, "Google", { expiresIn: "115d" }, (error, token) => {
//         res.send({
//           success: true,
//           msg: "Signup done",
//           token,
//         });
//       });
//     }
//   } else {
//     res.send({
//       success: false,
//       msg: "sign not done",
//     });
//   }
// });
app.post("/signup", async (req, res) => {
  try {
    const useData = req.body;

    if (!useData.email || !useData.password) {
      return res.status(400).send({
        success: false,
        msg: "Email and password are required",
      });
    }

    const db = await connection();
    const collection = db.collection("user");

    const result = await collection.insertOne(useData);

    if (result.acknowledged) {
      jwt.sign(
        { email: useData.email },
        "Google",
        { expiresIn: "115d" },
        (error, token) => {
          if (error) {
            return res.status(500).send({
              success: false,
              msg: "Token generation failed",
            });
          }

          return res.send({
            success: true,
            msg: "Signup done",
            token,
          });
        }
      );
    }
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).send({
      success: false,
      msg: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const useData = req.body;
  if (useData.email && useData.password) {
    const db = await connection();
    const collection = await db.collection("user");

    const result = await collection.findOne({
      email: useData.email,
      password: useData.password,
    });
    if (result) {
      //  jwt.sign(useData, "Google", { expiresIn: "15d" }, (error, token) => {
      // res.send({
      //             success: true,
      //             msg: "LOGINN done",
      //             token
      //         })

      //     });
      jwt.sign(useData, "Google", { expiresIn: "15d" }, (error, token) => {
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
        });

        res.send({
          success: true,
          msg: "LOGINN done",
        });
      });
    }
  } else {
    res.send({
      success: false,
      msg: "user not found",
    });
  }
});

app.get("/", (req, res) => {
  res.send({
    Message: "api",
    succeess: true,
  });
});

app.post("/add-task", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(req.body);
  if (result) {
    res.send({ Message: "new task added", success: true, result });
  } else {
    res.send({ Message: "task not added", success: false });
  }
});
app.get("/tasks", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    res.send({ message: "task list fetched", success: true, result });
  } else {
    res.send({ message: "error try after sometime", success: false });
  }
});

app.get("/tasks/:id", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const id = req.params.id;
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ message: "task list fetched", success: true, result });
  } else {
    res.send({ message: "error try after sometime", success: false });
  }
});

app.put("/update-task", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const { _id, ...fields } = req.body;
  const update = { $set: fields };
  console.log(fields);
  //res.send("test");
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);
  if (result) {
    res.send({
      message: "taskdata update",
      success: true,
      result,
    });
  } else {
    res.send({ message: "error try after sometime", success: false });
  }
});

app.delete("/delete/:id", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const id = req.params.id;
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ message: "task deleted", success: true, result });
  } else {
    res.send({ message: "error try after sometime", success: false });
  }
});

function verifyJWTToken(req, res, next) {
  //console.log("verifyjwttoken",req.cookies['token']);
  const token = req.cookies["token"];
  jwt.verify(token, "Google", (error, decoded) => {
    if (error) {
      return res.send({
        msg: "invalid token",
        succeess: false,
      });
    }
    //  console.log(decoded);
    next();
  });
}
app.listen(3200, () => {
  console.log("connected successful");
});
