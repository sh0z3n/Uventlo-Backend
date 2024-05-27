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


        OrganizedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },

        isPublished:{
            type:Boolean,
            default : false,
        },
        tags :[{
            type:String
        }],

        mode :{
            type : String,
            // required : true,
            enum : ['online','onsite','hybrid'],
        },

        has_floor : {type : Boolean, default : false},

        attendees: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            attendeeType: {
                type: String,
            },
        }],
        totalSpots: {
            type: Number,
            default: 0,
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        }],

    },
    { timestamps : true},
);

eventSchema.statics.calculateRemainingSpots = async function () {
    const events = await this.aggregate([
        { $project: { totalSpots: this.totalSpots, attendeesCount: { $size: '$attendees' } } },
        { $addFields: { remainingSpots: { $subtract: ['$totalSpots', '$attendeesCount'] } } }
    ]);
    return events;
};

eventSchema.statics.getAttendeeTypeCounts = async function() {
    const attendeeCounts = await this.aggregate([
      { $unwind: '$attendees' },
      { $group: { _id: '$attendees.attendeeType', count: { $sum: 1 } } }
    ]);
  
    return attendeeCounts.map(count => ({
      type: count._id,
      count: count.count
    }));
  };

eventSchema.methods.calculateOverallAccomplishment = function() {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(task => task.status === 'Completed').length;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

eventSchema.statics.getNextEventDate = async function(currentEventId) {
    const currentEvent = await this.findById(currentEventId);

    if (!currentEvent) {
        return null;
    }

    const nextEvent = await this.findOne({ _id: { $gt: currentEvent._id } }, null, { sort: { _id: 1 } });

    if (!nextEvent) {
        return null; 
    }

    return nextEvent.date;
};

export default mongoose.model('Event',eventSchema);
