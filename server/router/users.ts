import { z } from "zod";
import { createRouter } from "./context";

const PHONE_REGEX = new RegExp(
  /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/
);
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const doctorRouter = createRouter()
  .mutation("create", {
    input: z.object({
      name: z.string(),
      phoneNumber: z.string().regex(PHONE_REGEX, "Invalid number"),
      email: z.string().email().toLowerCase(),
      address: z.optional(z.string()),
      image: z.optional(
        z
          .any()
          .refine(
            (file) => file?.size <= MAX_FILE_SIZE,
            `Max image size is 5MB.`
          )
          .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
          )
      ),
      gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
    }),
    resolve: async ({ ctx, input }) => {
      const { db } = ctx;
      const { name, phoneNumber, address, email, image, gender } = input;

      let imageBytes;
      if (image)
        imageBytes = await image.arrayBuffer();

      //   const user = await ctx.db.user.findFirstOrThrow({
      //     where: { id: ctx.userId },
      //   });

      const res = await db.user.create({
        data: {
          name,
          phoneNumber,
          email,
          address,
          image: imageBytes,
          gender,
        },
      });

      return res;
    },
  })

  .query("all", {
    input: z.object({
      email: z.string().optional(),
    }),
    resolve: async ({ ctx, input }) => {
      const users = ctx.db.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          email: { contains: input.email, mode: "insensitive" },
          //   createdById: ctx.userId,
        },
      });

      return users;
    },
  })
  .mutation("delete", {
    input: z.object({ id: z.number() }),
    resolve: async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({ where: { id: input.id } });

      const response = await ctx.db.user.delete({
        where: { id: input.id },
      });

      return response;
    },
  });

export default doctorRouter;
