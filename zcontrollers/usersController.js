import { getAllUsers, getUserInfo } from "../models/userModel.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserInfoController = async (req, res) => {
   const { id } = req.params;
  try {
    const users = await getUserInfo(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

