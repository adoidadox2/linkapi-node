import { Schema, model } from 'mongoose';

const BalanceSchema = new Schema(
  {
    date: String,
    value: Number,
  },
  {
    timestamps: true,
  },
);

export default model('Balance', BalanceSchema);
