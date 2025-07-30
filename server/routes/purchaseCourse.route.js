import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout/create-order").post(isAuthenticated, createRazorpayOrder);
router.route("/checkout/verify-payment").post(isAuthenticated, verifyRazorpayPayment);
router.route("/course/:courseId/detail-with-status").get((req, res) => {
  res.status(200).json({ message: "Not implemented yet." });
});


export default router;