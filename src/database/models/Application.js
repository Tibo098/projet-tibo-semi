import { applicationSchema } from "@/database/schemas/applicationSchema"
import mongoose from "mongoose"
 
export const ApplicationModel =
  mongoose.models.Application || mongoose.model("Application", applicationSchema)