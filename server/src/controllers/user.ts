import User from "../models/user";
import { Request, Response } from "express";
import { validator } from "../utils/validator";
import { UpdateUserSchema, CreateUserSchema } from "../utils/schemas";
import { IUserAuthRequest } from "../utils/interfaces";


/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /users/profile
 */
export async function getProfile (req: IUserAuthRequest, res: Response): Promise<void> {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
  
    res.json(user);

  } catch (error) {
    console.error("Failed to fetch profile", { userId: req.userId });

    res.status(500).json({
      error: "Failed to fetch profile, please try again",
    }); 
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * GET /users
 */
export async function getUsers (req: Request, res: Response): Promise<void> {
  try {
    const users = await User.find();
    res.status(200).json(users);  

  } catch (error) {
    console.error("Failed to fetch users");

    res.status(500).json({
      error: "Failed to fetch users, please try again",
    }); 
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * POST /users/:id
 */
export async function createUser (req: Request, res: Response): Promise<void> {
  const { error, data } = await validator(CreateUserSchema, req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  
  try {
    const user = new User(data);
    await user.save();
    res.status(201).json(user);
   
  } catch (error) {
    console.error("Failed to create user", { body: req.body, error });

    res.status(500).json({
      error: "Failed to create user, please try again",
    }); 
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * PUT /users/:id
 */
export async function updateUser (req: Request, res: Response): Promise<void> {
  const { error, data } = await validator(UpdateUserSchema, req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  
  } catch (error) {
    console.error("Failed to update user", { body: req.body, params: req.params, error });

    res.status(500).json({
      error: "Failed to update user, please try again",
    }); 
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<createServer.NextHandleFunction | Response | void | * | Promise<any>>}
 * DELETE /users/:id
 */
export async function deleteUser (req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    res.sendStatus(204);

  } catch (error) {
    console.error("Failed to delete user", { params: req.params, error });

    res.status(500).json({
      error: "Failed to delete user, please try again",
    });   
  }
};
