'use client'
import { Button, Callout, Spinner, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';

interface Props{
    issue?: Issue
}

type IssueFormData = z.infer<typeof issueSchema>;
const SimpleMDE=dynamic(()=>import('react-simplemde-editor'),{ssr:false});
const IssueForm = ({issue}:Props) => {
    const route = useRouter();
    const [isSubmitting, setSubmit]=useState(false);
    const [error, setError] = useState('');
    const { register, control, handleSubmit,formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    return (
        <div className='mx-auto max-w-xl space-y-3'>
            {error && <Callout.Root color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(
                async (data) => {
                    try {
                        if(issue)
                            await axios.patch('/api/issues/'+issue.id,data);
                        else
                            await axios.post('/api/issues', data);
                        setSubmit(true);
                        route.push("/issues");
                        route.refresh();
                    } catch (error) {
                        setSubmit(false);
                        setError('An unexpected error.')
                    }
                }
            )}>
                <TextField.Root size='2' placeholder='Title' defaultValue={issue?.title} {...register('title')}>
                </TextField.Root>
                {errors.title &&<ErrorMessage>{errors.title?.message}</ErrorMessage>}
                <Controller
                    defaultValue={issue?.description}
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
                <Button disabled={isSubmitting}>{issue?'Update Issue':'Submit new Issues'}{isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    )
}

export default IssueForm