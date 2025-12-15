import { Agent, run, tool } from '@openai/agents';
import { setDefaultOpenAIClient } from '@openai/agents';
import { OpenAI } from 'openai';
import z from 'zod';
import {config} from 'dotenv';

config();

const historyFunFact = tool({
  name: 'history_fun_fact',
  description: 'Give a fun fact about a historical event',
  parameters: z.object({}),
  execute: async () => {
    return 'Sharks are older than trees.';
  },
});

const customClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY_NEW,
  });
setDefaultOpenAIClient(customClient);


const agent = new Agent({
  name: 'History Tutor',
  instructions:
    'You provide assistance with historical queries. Explain important events and context clearly.',
  tools: [historyFunFact],
});

const result = await run(agent, 'When did sharks first appear?');
console.log(result.finalOutput);

// Code within the code,
// Functions calling themselves,
// Infinite loop's dance.