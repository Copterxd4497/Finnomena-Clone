import { User } from "../models/User.js";
import { Trade } from "../models/Trade.js";
import { Portfolio } from "../models/Portfolio.js";
import { Watchlist } from "../models/Watchlist.js";
import mongoose from "mongoose";

export class DatabaseService {
  // User operations
  static async createUser(userData: any) {
    const user = new User(userData);
    return await user.save();
  }

  static async findUserById(userId: string) {
    return await User.findById(userId);
  }

  static async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  static async updateUserBalance(userId: string, newBalance: number) {
    return await User.findByIdAndUpdate(
      userId,
      { balance: newBalance },
      { new: true }
    );
  }

  // Trade operations
  static async createTrade(tradeData: any) {
    const trade = new Trade(tradeData);
    return await trade.save();
  }

  static async getTradesByUser(userId: string, limit: number = 50) {
    return await Trade.find({ userId }).sort({ createdAt: -1 }).limit(limit);
  }

  static async getTradesBySymbol(userId: string, symbol: string) {
    return await Trade.find({ userId, symbol }).sort({ createdAt: -1 });
  }

  static async updateTradeStatus(tradeId: string, status: string) {
    return await Trade.findByIdAndUpdate(tradeId, { status }, { new: true });
  }

  // Portfolio operations
  static async getPortfolioByUser(userId: string) {
    return await Portfolio.find({ userId });
  }

  static async getPortfolioItem(userId: string, symbol: string) {
    return await Portfolio.findOne({ userId, symbol });
  }

  static async updatePortfolio(
    userId: string,
    symbol: string,
    portfolioData: any
  ) {
    return await Portfolio.findOneAndUpdate(
      { userId, symbol },
      { ...portfolioData, lastUpdated: new Date() },
      { new: true, upsert: true }
    );
  }

  static async calculatePortfolioValue(userId: string) {
    const portfolio = await Portfolio.find({ userId });
    return portfolio.reduce((total, item) => total + item.currentValue, 0);
  }

  // Watchlist operations
  static async addToWatchlist(
    userId: string,
    symbol: string,
    companyName: string
  ) {
    const watchlistItem = new Watchlist({
      userId,
      symbol,
      companyName,
    });
    return await watchlistItem.save();
  }

  static async getWatchlistByUser(userId: string) {
    return await Watchlist.find({ userId }).sort({ addedAt: -1 });
  }

  static async removeFromWatchlist(userId: string, symbol: string) {
    const result = await Watchlist.deleteOne({ userId, symbol });
    return result.deletedCount > 0;
  }

  // Analytics and reporting
  static async getTradeAnalytics(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const trades = await Trade.find({
      userId,
      createdAt: { $gte: startDate },
      status: "completed",
    });

    const totalTrades = trades.length;
    const buyTrades = trades.filter((trade) => trade.type === "buy");
    const sellTrades = trades.filter((trade) => trade.type === "sell");
    const totalVolume = trades.reduce((sum, trade) => sum + trade.quantity, 0);
    const totalValue = trades.reduce((sum, trade) => sum + trade.totalValue, 0);
    const totalCommission = trades.reduce(
      (sum, trade) => sum + trade.commission,
      0
    );

    return {
      totalTrades,
      buyTrades: buyTrades.length,
      sellTrades: sellTrades.length,
      totalVolume,
      totalValue,
      totalCommission,
      averageTradeValue: totalTrades > 0 ? totalValue / totalTrades : 0,
    };
  }

  static async getPortfolioPerformance(userId: string) {
    const portfolio = await Portfolio.find({ userId });
    const totalInvested = portfolio.reduce(
      (sum, item) => sum + item.totalInvested,
      0
    );
    const currentValue = portfolio.reduce(
      (sum, item) => sum + item.currentValue,
      0
    );
    const unrealizedPL = portfolio.reduce(
      (sum, item) => sum + item.unrealizedPL,
      0
    );
    const realizedPL = portfolio.reduce(
      (sum, item) => sum + item.realizedPL,
      0
    );

    return {
      totalInvested,
      currentValue,
      unrealizedPL,
      realizedPL,
      totalPL: unrealizedPL + realizedPL,
      returnPercentage:
        totalInvested > 0
          ? ((currentValue - totalInvested) / totalInvested) * 100
          : 0,
    };
  }

  // Database health check
  static async healthCheck() {
    try {
      // Fix: Add null check for mongoose.connection.db
      if (!mongoose.connection.db) {
        console.error("Database connection not established");
        return false;
      }

      await mongoose.connection.db.admin().ping();
      return true;
    } catch (error) {
      console.error("Database health check failed:", error);
      return false;
    }
  }
}
