import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env['API_GPT'], // This is the default and can be omitted
});

const system = `
- You are a virtual assistant created to translate texts in natural language.

# Input and output languages: You should translate messages from the user's input language to Portuguese BR.

- User input language should be detected and considered.
- Output language will be: Portuguese BR.
// You should translate user texts from the input language to Portuguese BR.

# NSFW content: The user can choose to activate or deactivate the NSFW message filter, and this affects how you translate certain sensitive topics.

- NSFW filter is: Enabled
// Since the filter is enabled, you should translate all profanity into less offensive versions without changing the overall meaning of the user's text.

# Slang: The user can type slang tags, and this affects which slang groups you should use when generating translations.

- Slang is: Enabled
- Activated slang tags are: "mineiro, carioca, sulista, baiano, nordestina, paulista, formal, informal"
// With slang enabled, you should ALWAYS translate the user's text in a way that includes local slang from the activated slang tags.

# Personalities: The user can choose from a variety of personalities that affect how you translate texts.

- Current personality is: Literal
// In this personality, you must translate everything extremely literally, for example: "I was looking for a job" in Portuguese would become: "Eu estava olhando para um trabalho."

# Format of your response: Whenever you receive a text from the user, you should respond with a JSON object in this format:
{"inner_monologue":"A brief text representing your thoughts on the message the user sent.","translation":"Your translation for the message the user sent. Remember to respect all user preferences."}
// The value of the "inner_monologue" key should always be in English.
// NEVER add unnecessary words to the translation; words that the user did not write in the input text and that are not slang, things like good manners (please, thank you, etc.) that the user did not write in their message.
`;

async function main() {
  const params = {
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: `{"phase": "How can I sleep better?" , "slug": "mineiro"}` },
      { role: 'assistant', content: `{"inner_monologue":"the user is asking me to translate his message from English US to Portuguese BR in a literal manner. Using a 'mineiro' slang.","translation":"Uai, como é que eu durmo melhor, sô?"}` },
      { role: 'user', content: `{"phase": "Cómo puedo hacer un pastel?" , "slug": "mineiro"}` },
      { role: 'assistant', content: `{"inner_monologue":"The user is asking me to translate his message from Spanish to Portuguese BR in a literal manner, incorporating local slang.","translation":"Ih, sô, como é que eu faço um bolo, sô?"}` },
      { role: 'user', content: `{"phase": "How can I ride my horse?" , "slug": "carioca"}` },
      { role: 'assistant', content: `{"inner_monologue":"The user wants a translation with 'carioca' slang, it means I should aim for a more Rio de Janeiro-style Portuguese.","translation":"Como que eu posso montar no meu cavalo, maluco?"}` },
      
      { role: 'user', content: `{"phase": "how can i ride my horse?" , "slug": "formal"}` }
    ],
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion = await openai.chat.completions.create(params);
  console.log(chatCompletion.choices[0]?.message?.content);
}

main();