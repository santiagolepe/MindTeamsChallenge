import { Schema, Document, model } from "mongoose";

export interface ITransfer extends Document {
  user      : Schema.Types.ObjectId;
  account   : Schema.Types.ObjectId;
  started_at: Date;
  ended_at  : Date;
};

const transferSchema = new Schema<ITransfer>({
  user      : { type: Schema.Types.ObjectId, ref: "User", required: true },
  account   : { type: Schema.Types.ObjectId, ref: "Account", required: true },
  started_at: { type: Date, required: true, default: Date.now },
  ended_at  : { type: Date },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Transfer =  model<ITransfer>("Transfer", transferSchema);
export default Transfer;