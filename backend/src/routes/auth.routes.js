import { Router } from "express";
import passport from "passport";

import authenticate from "../middleware/auth.middleware.js";
import { currentUser, googleCallback, logout } from "../controllers/auth.controller.js";

const router = Router();
router.get("/me", authenticate, currentUser);

router.post("/logout", authenticate, logout);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/"
  }),
  googleCallback
);

export default router;
