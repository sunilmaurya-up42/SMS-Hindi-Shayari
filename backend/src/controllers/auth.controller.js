import generateJwt from "../utils/generateJwt.js";

export const googleCallback = async (req, res) => {
  const token = generateJwt(req.user);

  return res.status(200).json({
    success: true,
    token,
    user: req.user
  });
};

export const currentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};
