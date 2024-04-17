import { props } from "bluebird";
import validator from "validator";
import mongoose from "mongoose";


const mapSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required : true
        },

        location:{
            type:String,
            required : true
        },
        size :{
            type : String,
            required: true,
            validate:{
                validator: function(value){
                    return value > 0 ;
                },
                message : props => `${props.value} should be positive !`
            }
        },
        description: String

    }
    
);

mapSchema.methods.formatlocation = function(){
    return this.location.toUppercase()
};

export default mongoose.model('Map',mapSchema);