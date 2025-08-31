import mongoose, { Document, Schema } from "mongoose";

export interface IWatchlist extends Document {
  userId: mongoose.Types.ObjectId;
  symbol: string;
  companyName: string;
  addedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const watchlistSchema = new Schema<IWatchlist>(
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
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique user-symbol combinations
watchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });
watchlistSchema.index({ userId: 1 });

export const Watchlist = mongoose.model<IWatchlist>(
  "Watchlist",
  watchlistSchema
);
