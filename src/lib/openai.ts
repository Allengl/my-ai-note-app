import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw Error("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({
  apiKey,
<<<<<<< HEAD
  timeout: 100000,
  baseURL: "https://api.deepseek.com"
=======
  timeout: 10000,
  baseURL: "https://api.openai-proxy.com/v1",
>>>>>>> d570e082e13611a844af7bd97cebf021fbf693db
});

export default openai;

export async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const embedding = response.data[0].embedding;

  console.log(response);

  if (!embedding) throw Error("Error generating embedding.");

  console.log(embedding);

  return embedding;
}
