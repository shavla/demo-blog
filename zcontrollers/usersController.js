import { getAllUsers, getProfileInfo } from "../models/userModel.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getProfileInfoController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const users = await getProfileInfo(userId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
