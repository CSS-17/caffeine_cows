import express from "express";

import {getReviews} from "../controllers/review.controller.js";
import {createReviews} from "../controllers/review.controller.js";
import {updateReview} from "../controllers/review.controller.js";
import {deleteReview} from "../controllers/review.controller.js";

const router = express.Router();

export default router;

router.get("/", getReviews);
router.post("/", createReviews);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);