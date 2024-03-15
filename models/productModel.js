const mongoose= require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
   category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    rating:{
     type:Number,
     default:4
     
    },
    numReviews:{
       type:Number,
       default:12
    },
    photo: {
    type:String
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("Products", productSchema);
