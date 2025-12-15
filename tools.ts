import { tool } from "@openai/agents";
import z from "zod";

export const helpUserInStudyTool = tool({
  name: "help_user_in_study",
  description: "Helps the user with their study queries.",
  parameters: z.object({
    subject: z.string().describe("The subject the user needs help with"),
    answerLevel: z.enum(["1", "2", "3"]).describe("The level of detail for the answer (1: basic, 2: intermediate, 3: advanced)"),
  }),
  execute: async ({ answerLevel, subject }) => {
    return `Here is a level ${answerLevel} explanation on ${subject}.`;
  },
})