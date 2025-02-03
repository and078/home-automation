import { Router } from "express";
import edit_toggle_device_controller from "../../controllers/toggle/edit_toggle_device_controller.js";

const app = Router();

app.patch("/edit-toggle-device/:id", edit_toggle_device_controller);

export default app;