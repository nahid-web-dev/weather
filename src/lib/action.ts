import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT_4O_MINI,
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    { "role": "user", "content": "write a haiku about ai" },
  ],
});

completion.then((result) => console.log(result.choices[0].message));


const handleMessageTest = async (formData: FormData) => {

  try {

  } catch (error) {
    console.log(error)
  }
}