import { Button } from '@radix-ui/themes'
import React from 'react'

interface Props{
    issueId:Number
}

const DeleteIssueButton = ({issueId}:Props) => {
  return (
    <Button color='red'>Delete Issue</Button>
  )
}

export default DeleteIssueButton