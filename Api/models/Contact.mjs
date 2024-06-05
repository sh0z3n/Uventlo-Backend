import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        contact: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        lastMessageTime: {
            type: Date,
        },
    }
);

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;