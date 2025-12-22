import { BaseController } from '../utils/BaseController';
import * as userService from '../services/user.service';

const getUserDetails = BaseController(async (req, res, next) => {
  const user = req?.user;
  const { id, full_name, email, gender, role } =
    await userService.getUserDetails(user?.id!);
  res.status(200).json({ id, full_name, email, gender, role });
});

export { getUserDetails };
