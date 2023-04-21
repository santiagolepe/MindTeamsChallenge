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
    const { account, user, started_at, ended_at } = req.query;

  const filter: any = {};

  if (account) {
    filter.account = account;
  }

  if (user) {
    filter.user = user;
  }

  if (started_at) {
    filter.started_at = { $gte: new Date(started_at as string) };
  }

  if (ended_at) {
    filter.ended_at = { $lte: new Date(ended_at as string) };
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