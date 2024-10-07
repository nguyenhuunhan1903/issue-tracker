import prisma from '@/prisma/client'
import React from 'react'
import { notFound } from 'next/navigation';
import { Card, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/issueStatusBadge';
import ReactMarkdown from 'react-markdown';
interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    if (!issue) notFound();
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <div className='flex gap-2 my-2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.created.toDateString()}</Text>
            </div>
            <Card className='prose mt-4'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailPage