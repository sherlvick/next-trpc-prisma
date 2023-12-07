// import superjson from "superjson";
import { createRouter } from "./context";
import userRouter from "./users";
import authRouter from "./auth";
// import { adminRouter } from "./admin";

export const appRouter = createRouter()
  .merge("users.", userRouter)
  .merge("auth.", authRouter);

export type AppRouter = typeof appRouter;
