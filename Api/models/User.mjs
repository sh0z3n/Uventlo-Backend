import bcrypt from "bcrypt";
import validator from "validator";
import zxcvbn from 'zxcvbn';
import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required : true,
            trim : true,
            maxlength : [30, 'Name should be less than 50 characters !']
             },

        email :{
            type : String,
            required : true,
            lowecase: true,
            unique : true,
            trim : true,
            validate : {
                validator : validator.isEmail,
                message : 'Invalid Email !'
            },
        },
        password :{
            type : String,
            required : true,
            minlength : [8,'password have to be more than 8 letters'],
            advice : {
                type : String,
                validate : {
                    // validator : (value) => zxcvbn(value).score > 0.5,
                    // message : 'Password is weak !'
                }}
        },

        role :{
            type : String,
            // enum : ['user','admin','organizer','vip'],
            default : 'user',
            required : true
        },
        loginAttempts: { type: Number, default: 0 } ,
        social: {
            facebook: String,
            twitter: String,
            linkedin: String,
            instagram: String,
            type: Map,
        },
        picture: String,
        bio: String,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);


userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);