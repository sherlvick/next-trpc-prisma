import { TRPCError } from "@trpc/server";
import { deleteCookie, setCookie } from "cookies-next";
import { z } from "zod";
import { compare, sign } from "../../utils";
import { KEY_ACCESSTOKEN } from "../key";
import { createRouter } from "./context";

const authRouter = createRouter()
  .mutation("login", {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { password, username } = input;

      const admin = await ctx.db.admin.findFirst({
        where: { user_name: username?.toLowerCase().trim() },
      });

      const notFoundError = new TRPCError({
        code: "NOT_FOUND",
        message: "Invalid Employee ID or Password",
      });

      if (!admin) {
        throw notFoundError;
      }

      if (!compare(password, admin.password)) {
        throw notFoundError;
      }

      const claims = {
        "x-default-role": "admin",
        "x-allowed-roles": ["admin"],
        "x-user-id": admin?.id,
      };
      const accessToken = sign(claims);

      setCookie(KEY_ACCESSTOKEN, accessToken, { req: ctx.req, res: ctx.res });
      return { accessToken };
    },
  })
  .mutation("logout", {
    resolve: ({ ctx }) => {
      deleteCookie(KEY_ACCESSTOKEN, { req: ctx.req, res: ctx.res });
      return "Successfully logged out!";
    },
  });

export default authRouter;
