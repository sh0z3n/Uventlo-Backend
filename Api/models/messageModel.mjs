const mongoose = require('mongoose')
const MessageSchema = mongoose.Schema(
    {
        chatId: {
            type: String
        },
        senderId: {
            type: String
        },
        receiverId: {
            type: String
        },
        content: {
            type: String
        }

    },{timestamps:true})

const MessageModel = mongoose.model("message", MessageSchema)
module.exports = MessageModel