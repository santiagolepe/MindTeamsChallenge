import mongoose, { Schema, Document, model } from "mongoose";
import Transfer from "./transfer";

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

// TODO: imporve adding batching
accountSchema.pre<IAccount>("save", async function (next) {
  // if has version means its an update
  if (this.__v >= 0) {
    // if we have adding or deleting users from teams
    if (this.isModified("team")) {
      let preAccount = await Account.findById(this._id);
      if (preAccount) {
        const insertions = this.team.filter(team => !preAccount?.team.includes(team));
        const delettions = preAccount.team.filter(team => !this.team.includes(team));
        
        if (insertions.length) {
          let insert = insertions.map(user => ({ user, account: this._id }));
          await Transfer.insertMany(insert);  
        }
        if (delettions.length) {
          await Transfer.updateMany({ user: { $in: delettions }, account: this._id }, { ended_at: new Date() }, { new: false });
        }
      }
    };
  
  // create all new transfers logs
  } else {
    let insert = this.team.map(user => ({ user, account: this._id }));
    await Transfer.insertMany(insert);
  }
  next();
});

const Account = model<IAccount>("Account", accountSchema);
export default Account;
