import express from 'express';
import { generateResetToken, login, register, resetPassword } from '../controller/user';

export default (router: express.Router) => {
  router.post("/user/register", register);
  router.post("/user/login", login);
  router.post("/user/reset-token",generateResetToken);
  router.put("/user/reset-password",resetPassword);
};
