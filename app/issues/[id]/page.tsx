import prisma from '@/prisma/client'
import React, { cache } from 'react'
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/issueStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import AssigneeSelect from './AssigneeSelect';
import { title } from 'process';
interface Props {
    params: { id?: string }
}

const fetchUser=cache((issueId:number)=>prisma.issue.findUnique({
    where:{id:issueId}
}));

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession();
    const issue = await fetchUser(parseInt(params.id!));
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
            {session && <Box>
                <Flex direction="column" gap="2">
                    <AssigneeSelect issue={issue}/>
                    <Button>
                        <Pencil2Icon />
                        <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
                    </Button>
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}
        </Grid>
    )
}

export async function generateMetadata({params}:Props) {
    const issue=await fetchUser(parseInt(params.id!));

    return {
        title:issue?.title,
        description: 'Details of issue'+issue?.id
    }
}

export default IssueDetailPage