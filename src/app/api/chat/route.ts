import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTruncated = messages.slice(-6)

    const embedding = await getEmbedding(
      messagesTruncated.map(message => message.content).join("\n")
    );
    const { userId } = auth();

    // 权重节点索引
    const vectoryQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 1,
      filter: { userId }
    })

    const relevantNotes = await prisma.note.findMany({
      where: {
        id: {
          in: vectoryQueryResponse.matches.map(match => match.id)
        }
      }
    })

    console.log("Relevant notes found", relevantNotes);


    const systemMessage: ChatCompletionMessage = {
      role: "system",
      content:
        "You are an intelligent note-taking app. You answer the user's question based on their existing notes." +
        "the relevant notes for this query are:\n" +
        relevantNotes.map(note => `Title: ${note.title}\n\nContent:\n${note.content}`).join("\n")
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTruncated],
    })

    const stream  = OpenAIStream(response)
    return new StreamingTextResponse(stream)

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }

}