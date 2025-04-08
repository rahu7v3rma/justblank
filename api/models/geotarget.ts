import { model, Schema } from "mongoose";
import { Geotarget } from "../utils/types";

const GeotargetSchema = new Schema<Geotarget>({
  criteriaId: String,
  name: String,
  canonicalName: String,
  targetType: String,
  countryCode: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const GeotargetModel = model<Geotarget>("Geotarget", GeotargetSchema);

export default GeotargetModel;
