import { Router } from "express";
import passport from "passport";
import { socialAuthController } from "../controllers/auth.social.controller.js";

const routes = Router();
const CLIENT_ROUTE = process.env.CLIENT_ROUTE || "http://localhost:8080/dashboard"

routes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

routes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_ROUTE,
  })
);

//
routes.get("/login/success", socialAuthController);

export default routes;
