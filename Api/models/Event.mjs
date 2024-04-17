import mongoose from "mongoose";
import validator from "validator";
const eventSchema = new mongoose.Schema(
    {
        
        name:{
            type : String,
            required: true,
            trim : true ,
            maxlength : [50, 'Name should be less than 50 characters !']

        },

        description:{
            type : String,
            required: true,
        },

        date:{
            type : Date,
            // required : true,
            default : Date.now,
            validator : {
                valiate  : (value) => validator.isDate(value.toString()),
                message : 'Enter a correct Date !',
            }
        },

        location: {
            type : String,
            trim :true,
            // required : true,
        },

        index :{
            type : Number,
            unique : true,
        },


        OrganizedBy:{
            type : [mongoose.Schema.Types.ObjectId],
            required : true,
        },

        isPublished:{
            type:Boolean,
            default : false,
        },


        mode :{
            type : String,
            required : true,
            enum : ['online','onsite','hybrid'],
        },

        has_floor : {type : Boolean, default : false},

        attendees:{
            type : [mongoose.Schema.Types.ObjectId],
            // required : flase,
        },

        total_spots : Number

    },
    { timestamps : true},
);

eventSchema.methods.left_places = function (){
    return this.total_spots - this.attendees.length;
}

export default mongoose.model('Event',eventSchema);
