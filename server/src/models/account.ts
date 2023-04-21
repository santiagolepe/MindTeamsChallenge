import mongoose, { Schema, Document, model } from "mongoose";

export interface IAccount extends Document {
  name       : string;
  client     : string;
  responsible: Schema.Types.ObjectId;
  team       : mongoose.Types.Array<Schema.Types.ObjectId>;
}

const accountSchema = new Schema<IAccount>({
  name       : { type: String, required: true },
  client     : { type: String, required: true },
  responsible: { type: Schema.Types.ObjectId, ref: "User", required: true },
  team       : [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Account = model<IAccount>("Account", accountSchema);
export default Account;
