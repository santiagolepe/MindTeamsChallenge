import Account from "../models/account";
import User from "../models/user";
import Transfer from "../models/transfer";
import { Request, Response } from "express";
import { validator } from "../utils/validator";
import { CreateAccountSchema } from "../utils/schemas";

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /accounts
 */
export async function getAcounts (req: Request, res: Response): Promise<void> {
  try {
    const accounts = await Account.find().populate("responsible").populate("team");
    res.json(accounts);

  } catch (error) {
    console.error("Failed to fetch accounts");

    res.status(500).json({
      error: "Failed to fetch accounts, please try again",
    }); 
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /accounts/:id
 */
export async function getAcount (req: Request, res: Response): Promise<void> {
  try {
    const account = await Account.findById(req.params.id).populate("responsible").populate("team");

    if (!account) {
      res.status(404).json({ message: "Account not found" });
      return;
    }
  
    res.json(account);

  } catch (error) {
    console.error("Failed to fetch account", { params: req.params });

    res.status(500).json({
      error: "Failed to fetch account, please try again",
    }); 
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * POST /accounts
 */
export async function createAccount (req: Request, res: Response): Promise<void> {
  const { error, data } = await validator(CreateAccountSchema, req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  
  try {
    const account = new Account(data);
    await account.save();
    res.status(201).json(account);
   
  } catch (error) {
    console.error("Failed to create account", { body: req.body, error });

    res.status(500).json({
      error: "Failed to create account, please try again",
    }); 
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * PUT /accounts/:id
 */
export async function updateAccount (req: Request, res: Response): Promise<void> {
  const { error, data } = await validator(CreateAccountSchema, req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndUpdate(id, data, { new: true });
    res.json(account);
  
  } catch (error) {
    console.error("Failed to update account", { body: req.body, params: req.params, error });

    res.status(500).json({
      error: "Failed to update account, please try again",
    }); 
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * DELETE /accounts/:id
 */
export async function deleteAccount (req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    await Account.findByIdAndRemove(id);
    res.sendStatus(204);

  } catch (error) {
    console.error("Failed to delete account", { params: req.params, error });

    res.status(500).json({
      error: "Failed to delete account, please try again",
    });   
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * PATCH /accounts/:id/add-user/:userId
 */
export async function addUserAccount (req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userId;  
    const account = await Account.findById(req.params.id);

    if (!account) {
      res.status(404).json({ message: "Account not found" });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!account.team.includes(user._id)) {
      account.team.push(user._id);
      await account.save();

      // create a log transfer with start_at Date now
      await Transfer.create({
        user: user._id,
        account: account._id,
      });
    }

    res.json(account);
    
  } catch (error) {
    console.error("Failed to add user to account team", { params: req.params, error });

    res.status(500).json({
      error: "Failed to add user to account team, please try again",
    }); 
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * PATCH /accounts/:id/remove-user/:userId
 */
export async function removeUserAccount (req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userId;  
    const account = await Account.findById(req.params.id);

    if (!account) {
      res.status(404).json({ message: "Account not found" });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    account.team.pull(userId);
    await account.save();

    // update transfer logs, adding end_at
    await Transfer.findOneAndUpdate({ user: user._id, account: account._id }, { ended_at: new Date() }, { new: false });
    res.json(account);
    
  } catch (error) {
    console.error("Failed to add user to account team", { params: req.params, error });

    res.status(500).json({
      error: "Failed to add user to account team, please try again",
    }); 
  }
};
