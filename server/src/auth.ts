import { ContextFunction, BaseContext } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const authMiddleware: ContextFunction<
  [ExpressContextFunctionArgument],
  BaseContext
> = async ({ req }) => {
  const token = req.headers.authorization?.split(" ");
  try {
    const decode: any = jwt.verify(token![1], process.env.JWT_SECRET_KEY!);
    return { username: decode.username };
  } catch (error) {}
  return {};
};
