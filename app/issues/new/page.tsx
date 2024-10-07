'use client'
import { Button, Callout, Spinner, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import dynamic from 'next/dynamic';
type IssueForm = z.infer<typeof createIssueSchema>;
const SimpleMDE=dynamic(()=>import('react-simplemde-editor'),{ssr:false});
const NewIssuePage = () => {
    const route = useRouter();
    const [isSubmitting, setSubmit]=useState(false);
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
                        setSubmit(true);
                        await axios.post('/api/issues', data);
                        route.push("/issues");
                    } catch (error) {
                        setSubmit(false);
                        setError('An unexpected error.')
                    }
                }
            )}>
                <TextField.Root size='2' placeholder='Title' {...register('title')}>
                </TextField.Root>
                {errors.title &&<ErrorMessage>{errors.title?.message}</ErrorMessage>}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
                <Button disabled={isSubmitting}>Submit new Issues{isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage