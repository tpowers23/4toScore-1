import express from "express";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import homePageController from "../controllers/homePageController";
import userProfileController from "../controllers/userProfileController";
import staticPagesController from "../controllers/staticPagesController";
import friendsListController from "../controllers/friendsListController";
import initPassportLocal from "../controllers/passportLocalController";

/*
init passport routes
*/
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.getHomePage);
    router.post("/logout", loginController.postLogOut);

    router.get("/register", registerController.getRegisterPage);
    router.post("/register-new-user", registerController.createNewUser);

    router.get("/login", loginController.checkLoggedOut, loginController.getLoginPage);
    router.post("/login", loginController.handleLogin);

    //static pages
    router.get("/howtoplay", loginController.checkLoggedIn, staticPagesController.getHowToPlayPage);
    router.get("/eloranking", loginController.checkLoggedIn, staticPagesController.getEloRankingPage);
    router.get("/aboutus", loginController.checkLoggedIn, staticPagesController.getAboutUsPage);

    //game pages
    router.get("/unranked", loginController.checkLoggedIn, staticPagesController.getUnrankedPage);

    router.get("/friends", loginController.checkLoggedIn, friendsListController.getFriendsList);
    router.get("/profile", loginController.checkLoggedIn, userProfileController.getUserProfile);
    return app.use("/", router);
};

module.exports = initWebRoutes;
  