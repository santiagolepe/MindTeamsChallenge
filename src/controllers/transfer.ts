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
    const { accountId, userId, startedAt, endedAt } = req.query;

  const filter: any = {};

  if (accountId) {
    filter.account = accountId;
  }

  if (userId) {
    filter.user = userId;
  }

  if (startedAt) {
    filter.started_at = { $gte: new Date(startedAt as string) };
  }

  if (endedAt) {
    filter.ended_at = { $lte: new Date(endedAt as string) };
  }

  const transferLogs = await Transfer.find(filter)
    .populate("user", "-password")
    .populate("account");

  res.json(transferLogs);
  
  } catch (error) {
    console.error("Failed to fetch transfers", { query: req.query, error });

    res.status(500).json({
      error: "Failed to fetch transfers, please try again",
    }); 
  }
};