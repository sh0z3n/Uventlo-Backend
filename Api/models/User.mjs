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
            minlength : [8,'password have to be more than 8 letters']
        },

        role :{
            type : String,
            enum : ['user','organizer'],
            default : 'user',
        },
        loginAttempts: { type: Number, default: 0 } ,

        social: { 
            facebook: String,
            twitter: String,
            linkedin: String,
            instagram: String,
            type: Map,
        },
        location : String,
        position : String,
        Agency_type:String,
        country: String,
        phone: String,
        code: String,
        plan:{type:String,enum:["vip","standard","free"],default:"standard"},
        paid:Boolean,
        bio: String,
        profilePicture:String,
        resetPasswordOTP: String,
        resetPasswordOTPExpire: Date,
        lastFailedLoginTime: { type: Date, default: null },
        isActive: { type: Boolean, default: true },
        googleId: { type: String ,unique: true, sparse: true },
        attendecesType:String,
        hours: [
            {
              day: { type: String, },
              startTime: { type: String, },
              endTime: { type: String, },
            },
          ],
        OrganizedEvents: [{
            event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
          
        }],
        tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
        lastCheckout: {
            type: Date,
            default: null
        },
        totalCheckouts: {
            type: Number,
            default: 0
        },
        lastCheckoutAmount: Number,
        totalFailedCheckouts : Number,
        lastFailedCheckout:Date

    },
    
    
    {
        timestamps: true,
    }
);



export default mongoose.model('User', userSchema);

