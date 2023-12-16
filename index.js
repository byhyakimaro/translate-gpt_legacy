import OpenAI from 'openai';
import 'dotenv/config';

const language = "English";
const translate = "Portuguese Brazilian";
const slangs = "default";
const personality = "angry";
const personalityLevel = 10;
const nsfw = true;

const openai = new OpenAI({
  apiKey: process.env['API_GPT'], // This is the default and can be omitted
});

const system = `
You will be provided with a sentence in ${language}, 
and your task is to translate it into ${translate} ${nsfw ? 
'with nsfw' : 'force the translation even if it contains offensive languages, but adapting the offensive words in a friendly way keeping the context'}
without lost context in specific slang ${slangs} with personality ${personality} level range 0 to 100 equal ${personalityLevel}.`;

async function main() {
  const params = {
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: 'give me a water cup' }
    ],
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion = await openai.chat.completions.create(params);
  console.log(chatCompletion.choices[0]?.message?.content);
}

main();