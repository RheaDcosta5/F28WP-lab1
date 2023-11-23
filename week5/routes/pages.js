const express=require('express');
const router=express.Router();
authController=require('../controllers/auth');

router.get('/',authController.isLoggedIn, (req, res) => {
    res.render("index", {
        user: req.user
    });
});
router.get('/register', (req, res) => {
    res.render("register");
});
router.get('/login', (req, res) => {
    res.render("login");
});
router.get('/logout', (req, res) => {
    res.render("logout");
});
router.get('/profile', authController.isLoggedIn, (req, res) => {
    if(!req.user) {
        return res.status(401).redirect('/login');
    }
    res.render("profile", {
        user: req.user
    });
  });
module.exports=router;