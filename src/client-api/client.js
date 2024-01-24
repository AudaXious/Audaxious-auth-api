import express from "express";
import authRoutes from "./routes/auth.routes.js";
import {authorizeUser} from "../client-api/middlewares/auth.middleware.js"
import socialAuthRoutes from "./routes/auth.social.routes.js";
import walkthroughRoutes from "./routes/walkthrough.routes.js";

const app = express();

app.use(socialAuthRoutes)
app.use('/user', authRoutes)
app.use(authorizeUser);
app.use('/walkthrough', walkthroughRoutes)

export default app;