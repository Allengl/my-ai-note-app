import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw Error("PINECONE_API_KEY is not set");
}

const pinecone = new Pinecone({
  apiKey,
  environment: "us-east1-gcp",
});

export const notesIndex = pinecone.Index("nextjs-ai-note-app");
