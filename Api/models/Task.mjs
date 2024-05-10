import mongoose from "mongoose";
import validator from 'validator';

const taskSchema = new mongoose.Schema(
    {  
        title: {
            type: String,
            required: true,
            trim : true,
        },

        tag: [{
            type: String,
        }],

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

        start :{ 
            default: Date.now,
            type: Date,
            required: true,
           
        },

        deadline: {
            type: Date,
            required: true,
        },

        status : {
            type : String,
            enum : ["Pending","Review","Completed","In progress"],
            required : true
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        }

    }

);
 // we create a virtual property to calculate the remaining days
// taskSchema.virtual('remainingDays').get(function() {
//     const now = new Date();
//     const dueDate = this.dueDate.getTime();
//     return Math.ceil((dueDate - now) / (1000 * 3600 * 24));
// });


export default mongoose.model("Task", taskSchema);
