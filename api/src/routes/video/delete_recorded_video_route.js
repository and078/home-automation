import { Router } from "express";
import delete_recorded_video_controller from "../../controllers/video/delete_recorded_video_controller.js";

const app = Router();
app.post("/delete_record", delete_recorded_video_controller);

export default app;