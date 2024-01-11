import { Router } from "express";
import passport from "passport";
import { socialAuthController } from "../controllers/auth.social.controller.js";

const routes = Router();

routes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

routes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  socialAuthController
);

export default routes;