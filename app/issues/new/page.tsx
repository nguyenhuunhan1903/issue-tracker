'use client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const route=useRouter();
    const {register, control, handleSubmit} =useForm<IssueForm>();
    return (
        <form className='mx-auto max-w-xl space-y-3' onSubmit={handleSubmit(async (data)=>{await axios.post('/api/issues',data);route.push("/issues")})}>
            <TextField.Root size='2' placeholder='Title' {...register('title')}>
            </TextField.Root>
            <Controller 
            name='description'
            control={control}
            render={({field})=><SimpleMDE placeholder='Description' {...field}/>}
            />
            <Button>Submit new Issues</Button>
        </form>
    )
}

export default NewIssuePage