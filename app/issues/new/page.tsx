'use client'
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const route = useRouter();
    const [error, setError] = useState('');
    const { register, control, handleSubmit } = useForm<IssueForm>();
    return (
        <div className='mx-auto max-w-xl space-y-3'>
            {error && <Callout.Root color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(
                async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        route.push("/issues");
                    } catch (error) {
                        setError('An unexpected error.')
                    }
                }
            )}>
                <TextField.Root size='2' placeholder='Title' {...register('title')}>
                </TextField.Root>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <Button>Submit new Issues</Button>
            </form>
        </div>
    )
}

export default NewIssuePage