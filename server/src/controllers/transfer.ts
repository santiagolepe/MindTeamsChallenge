import Transfer from "../models/transfer";
import { Request, Response } from "express";

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /transfers
 */
export async function getTransfer (req: Request, res: Response): Promise<void> {
  try {
    const { accountId, userId, startDate, endDate } = req.query;

  const filter: any = {};

  if (accountId) {
    filter.account = accountId;
  }

  if (userId) {
    filter.user = userId;
  }

  if (startDate && endDate) {
    filter.startDate = { $gte: new Date(startDate as string) };
    filter.endDate = { $lte: new Date(endDate as string) };
  }

  const transferLogs = await Transfer.find(filter)
    .populate("user")
    .populate("account");

  res.json(transferLogs);
  
  } catch (error) {
    console.error("Failed to fetch transfers", { query: req.query });

    res.status(500).json({
      error: "Failed to fetch transfers, please try again",
    }); 
  }
};