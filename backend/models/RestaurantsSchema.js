import mongoose from "mongoose";

const RestaurantsSchema = new mongoose.Schema(
{
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true, unique: true },
  photo: { type: String, required: false },
  rating: { type: Number },
  cuisine: { type: String },
  price: { type: Number },
  description: { type: String,},
  opening: { type: String,},
  closing: { type: String,},
    phone: { type: Number },
});

export default mongoose.model("Restaurants", RestaurantsSchema);
