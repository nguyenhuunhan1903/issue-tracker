import prisma from '@/prisma/client'
import React from 'react'
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/issueStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import DeleteIssueButton from './DeleteIssueButton';
interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    if (!issue) notFound();
    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className='md:col-span-4'>
                <Heading>{issue.title}</Heading>
                <div className='flex gap-2 my-2'>
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.created.toDateString()}</Text>
                </div>
                <Card className='prose max-w-full mt-4'>
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Flex direction="column" gap="2">
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
                </Button>
                <DeleteIssueButton issueId={issue.id}/>
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage