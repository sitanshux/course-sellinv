import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createRazorpayOrder, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, verifyRazorpayPayment } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout/create-order").post(isAuthenticated, createRazorpayOrder);
router.route("/checkout/verify-payment").post(isAuthenticated, verifyRazorpayPayment);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated, getAllPurchasedCourse);


export default router;