import { listCategory } from "@/utils/constant"
import mongoose from "mongoose"

const { Schema } = mongoose
const applicationSchema = new Schema({
  typeCategory: { type: String, required: true, enum: listCategory },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: String, required() {
    // Le prix est requis uniquement pour certains types de lieux
    return ["restaurant", "musée", "parc", "bar"].includes(this.typeCategory)
  }}
})

export default mongoose.model("Application", applicationSchema)
