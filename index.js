import OpenAI from 'openai';
import 'dotenv/config';

const language = "English";
const translate = "Portuguese";
const slangs = "Carioca";

const openai = new OpenAI({
  apiKey: process.env['API_GPT'], // This is the default and can be omitted
});

const system = `
You will be provided with a sentence in ${language}, 
and your task is to translate it into ${translate} in specific slang ${slangs}.`;

async function main() {
  const params = {
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: 'Say this is a test' }
    ],
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion = await openai.chat.completions.create(params);
  console.log(chatCompletion.choices[0]?.message?.content);
}

main();