import { Agent, run, RunContext, setDefaultOpenAIClient } from "@openai/agents";
import { helpUserInStudyTool } from "./tools";
import OpenAI from "openai";
import { config } from 'dotenv';
import z from "zod";

config();

const customClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_NEW,
});
setDefaultOpenAIClient(customClient);

interface UserContext {
  name: string;
}

const OutputType = z.object({
  isImportantForInterview: z.enum(["yes", "no"]),
  explanation: z.string(),
});

function studyInstructions(runContext: RunContext<UserContext>): string {
  return `The user's name is ${runContext.context.name}. Be extra friendly!. Help them with their study queries effectively.`;
}

const StudyAgent = new Agent({
  name: "Study Buddy",
  instructions: studyInstructions,
  tools: [helpUserInStudyTool],
  outputType: OutputType,
})

const result = await run(StudyAgent, "Explain VirtualThread in Java", {
  context: {
    name: "Niladri"
  }
})

console.log(result.finalOutput)