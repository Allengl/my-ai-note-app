import React from 'react'
import { Note as NoteModel } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface NoteProps {
  note: NoteModel
}

const Note = ({ note }: NoteProps) => {
  const wasUpdated = note.updateAt > note.createAt

  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updateAt : note.createAt
  ).toDateString();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
            {createdUpdatedAtTimestamp}
            {wasUpdated && " {updated} "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='whitespace-pre-line'>
          {note.content}
        </p>
      </CardContent>
    </Card>
  )
}

export default Note
