import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
    return (
        <div className='mx-auto max-w-xl space-y-3'>
            <TextField.Root size='2' placeholder='Title'>
            </TextField.Root>
            <TextArea placeholder='Description'/>
            <Button>Submit new Issues</Button>
        </div>
    )
}

export default NewIssuePage