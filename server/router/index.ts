// import superjson from "superjson";
// import authRouter from "./auth";
import { createRouter } from "./context";
// import doctorRouter from "./doctor";
// import uploadRouter from "./upload";
import userRouter from "./user";
// import { adminRouter } from "./admin";

export const appRouter = createRouter().merge("user.", userRouter);

export type AppRouter = typeof appRouter;
