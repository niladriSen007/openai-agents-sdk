import { run, setDefaultOpenAIClient } from "@openai/agents";
import { customeFacingAgent } from "./agent";
import { config } from 'dotenv';
import OpenAI from "openai";

config({
  path: '../../.env'
});



const customClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_NEW,
});
setDefaultOpenAIClient(customClient);

const result = await run(
  customeFacingAgent,
  `I need to book a flight to Pune from Kolkata on 25th December only for me in business class and please give me the least expensive option and
  then request a refund for my previous hotel booking which I have done in Pune last week on hotel Taj which i have booked from booking.com and i haven't checked out in that room.`,
)

console.log(result.finalOutput);