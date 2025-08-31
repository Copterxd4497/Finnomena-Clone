import mongoose, { Document, Schema } from "mongoose";

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  symbol: string;
  quantity: number;
  averagePrice: number;
  totalInvested: number;
  currentValue: number;
  unrealizedPL: number;
  realizedPL: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new Schema<IPortfolio>(
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
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    averagePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalInvested: {
      type: Number,
      required: true,
      min: 0,
    },
    currentValue: {
      type: Number,
      required: true,
      min: 0,
    },
    unrealizedPL: {
      type: Number,
      default: 0,
    },
    realizedPL: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique user-symbol combinations
portfolioSchema.index({ userId: 1, symbol: 1 }, { unique: true });
portfolioSchema.index({ userId: 1 });

export const Portfolio = mongoose.model<IPortfolio>(
  "Portfolio",
  portfolioSchema
);
