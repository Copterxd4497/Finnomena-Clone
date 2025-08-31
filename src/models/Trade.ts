import mongoose, { Document, Schema } from "mongoose";

export interface ITrade extends Document {
  userId: mongoose.Types.ObjectId;
  symbol: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  totalValue: number;
  commission: number;
  status: "pending" | "completed" | "cancelled" | "failed";
  orderType: "market" | "limit" | "stop";
  createdAt: Date;
  updatedAt: Date;
}

const tradeSchema = new Schema<ITrade>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    totalValue: {
      type: Number,
      required: true,
      min: 0,
    },
    commission: {
      type: Number,
      default: 9.95,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "failed"],
      default: "pending",
    },
    orderType: {
      type: String,
      enum: ["market", "limit", "stop"],
      default: "market",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
tradeSchema.index({ userId: 1, createdAt: -1 });
tradeSchema.index({ symbol: 1, createdAt: -1 });
tradeSchema.index({ status: 1 });

export const Trade = mongoose.model<ITrade>("Trade", tradeSchema);
