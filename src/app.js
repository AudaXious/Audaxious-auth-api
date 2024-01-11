import "dotenv/config"
import express from "express";
import cors from "cors";
import { err404NotFound } from "./errors/middlewares/error.middleware.js";
import clientRoutes from "./client-api/client.js";
import { InitializePassport } from "./client-api/middlewares/social-auth/auth.social.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.get("/", async (_, res)=>{

    return res.status(200).json({
        success : true,
        message : "API is live and running"
    });
})

//Initialize passport middleware 
InitializePassport(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET);

app.use("/api/v1", clientRoutes);

//404 middleware for routes that does not exists on the server
app.use(err404NotFound)

export default app;