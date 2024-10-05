'use client'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
type IssueForm = z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
    const route = useRouter();
    const [error, setError] = useState('');
    const { register, control, handleSubmit,formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
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
                {errors.title &&<Text color='red' as="p">{errors.title.message}</Text>}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                <Button>Submit new Issues</Button>
            </form>
        </div>
    )
}

export default NewIssuePage