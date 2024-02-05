import { z } from "zod"


export const FormSchema = z.object({
    date: z.date({
      required_error: "Date is required.",
    }),
    time: z.string({
      required_error:"Time is required.",
    }),
    party:z.string({
      required_error:"Party size is required.",
    }),
    firstname:z.string({
      required_error:"First name is required",
    }),
    lastname:z.string({
      required_error:"Last name is required.",
    }),
    phone:z.string({
      required_error:"Phone number is required",
    }),
    email:z.string({
      required_error:"Email is required."
    }
    ).email({
      message:"Invalid email address",
    })
  })
