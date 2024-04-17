import mongoose from "mongoose";


const floorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    spots: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true
            },
            reservedBy: {
                type: String,
            }
        }
    ],
    floormap : { type : String },
    description  :{ type : String },
    reservatisons : [
        {
            name : { type : String},
            spot : { type : mongoose.Schema.Types.ObjectId, ref : 'Spot'},
            phone : { type : String },
            email : { type : String },
            status : { type : String },
            date : { type : Date }
        }
    ]
    

},
    {
        timestamps: true
}
);

const Floor = mongoose.model('Floor', floorSchema);


export default Floor;
