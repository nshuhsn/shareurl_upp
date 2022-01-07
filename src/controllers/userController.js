import User from "../models/User";
import bcrypt from "bcrypt";

export const home = async (req, res) => {
    return res.render("home.html")
};

export const login2 = async (req, res) => {
    return res.render("login2.html")
};

export const getJoin = (req, res) =>
    res.render("join", { pageTitle: "join" });

export const postJoin = async (req, res) => {
    const {username, password} = req.body;

    const exists = await User.exists({$or:[{username:req.body.username}]});

    if(exists){
        return res.render("join", { 
        pageTitle: "join" ,
        errorMessage: "This username is already taken",
        });
    }
    try{
        await User.create({
            username, 
            password
        });
        return res.redirect("/login");
    } catch(error){
        return res.status(400).render("join",{
            pageTitle:"join",
            errorMessage: error._message
        });
    }
};

export const getLogin = (req, res) => 
res.render("login",{pageTitle:"Login"})

export const postLogin = async(req, res) => {
    const {username, password} = req.body;
    const pageTitle= "Login"
    const user = await User.findOne({ username })
    if(!user){
        return res.status(400).render("login",{
            pageTitle, 
            errorMessage:"An account with this username does not exists"
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle, 
            errorMessage:"wrong password"
        });
    }
    // check if account exists
    // check if password correct
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};
export const logout = (req, res) => res.send("Log Out")
export const see = (req, res) => res.send("See User")
