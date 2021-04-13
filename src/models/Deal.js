import { Schema, model } from 'mongoose';

const DealSchema = new Schema(
  {
    deal_id: Number,
    title: String,
    customer_name: String,
    value: Number,
    currency: String,
    won_time: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Deal', DealSchema);
