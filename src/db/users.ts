//use schema adn model
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: "string",required: true},
    email: {type: "string",required: true},
    authentication:{
        password: {type: "string",required: true,select:false}, //avaid fetching authentication objec tand write entire api in aith data
        salt: {type: "string",select:false},
        sessionToken: {type: "string",select:false}
    }
})