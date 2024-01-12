import { Router } from "express";
import { validateRequest } from "../utils/api-utils.js";
import { updateUserInformation } from "../controllers/walkthrough.controller.js";
import { updateUserInformationValidator } from "../middlewares/validators/walkthrough.validators.js";

const routes = Router();

routes.patch("/update", validateRequest(updateUserInformationValidator), updateUserInformation)

export default routes;