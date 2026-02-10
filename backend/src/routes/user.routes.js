import {Router} from "express"
import { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, changeCurrentPassword } from "../controllers/user.controller"
import { verifyJWT } from "../middlewares/auth.middleware"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured Routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)

export default router