import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
// import jwt from "jsonwebtoken";

const db = new PrismaClient();

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  // let accessToken: string | undefined;
  // if (req.headers?.authorization?.startsWith("Bearer")) {
  //   accessToken = req.headers?.authorization?.split(" ")?.[1];
  // } else {
  //   accessToken = req.cookies?.accessToken;
  // }

  // const decodedValues: any = jwt.decode(accessToken!);

  // const userId: string = decodedValues?.["x-user-id"];

  // console.log("AccessToken ->", accessToken);

  return {
    req,
    res,
    db,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
