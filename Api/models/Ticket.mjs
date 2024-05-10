import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        
        owner: {
            type : mongoose.Schema.ObjectId,
            ref : 'User',
            required : true,
        },

        qrCode: {
            type: String
          },
          
        email: {
            type :String,
            // required : true,
            lowercase:true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },

        type :{
            type : String,
            enum : ['Visiter','Manager','idk','Standard'],
        },

        date :{
            type:Date,
            default:Date.now()
        },
        event :{
            type : mongoose.Schema.ObjectId,
            ref : 'Event',
        },
        location:{
            type:String
        },

        reservatisons : [
            {
                First_name : { type : String},
                Srcond_name : { type : String },
                email : { type : String },
                phone : { type : String },
            }
        ],
        
        location:String
    },
    {
        timestamps: true //  timestamps for createdAt and updatedAt will be added later on the controller
    }
);

// Export the ticket model
export default mongoose.model("Ticket", ticketSchema);