import mongoose from "mongoose";
import validator from "validator";


const chatSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        sender: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    },
);
const AttachmentSchema = new mongoose.Schema({
    utl:{
        type:String,
        required:true,
        trim:true,
        validate : {
            validator : validator.isURL,
            message : 'Invalid URL or Unsecure !'
        }
    },
    type:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    chat:{
        type:mongoose.Schema.ObjectId,
        ref:'Chat',
        required:true
    }
}, 
{
    timestamps:true
});


const Chat = mongoose.Model('Chat',chatSchema);
const Attachment = mongoose.Model('Attachment',AttachmentSchema);

module.exports = {Chat,Attachment};