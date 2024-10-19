import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import IssueStatusBadge from '../components/issueStatusBadge'
import Link from '../components/Link'
import IssueActions from './issueActions'
import { Issue, Status } from '@prisma/client'
const issues =async ({searchParams}:{searchParams:{status:any}}) => {
//Ky thuat nay kha hay
const statuses=Object.values(Status);
const status=statuses.includes(searchParams.status)?searchParams.status:undefined;
  let issues:Issue[]=[];
  if(searchParams.status!=='NOSELECT'){
  issues=await prisma.issue.findMany({
    where: {
      status: status
    }
  });}
  else
  {
    issues=await prisma.issue.findMany();
  }
  return (
    <div>
      <div className='mb-5'>
        <IssueActions/>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue=>(
            <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>
                  {issue.title}                  
                  </Link>
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={issue.status}/>
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status}/>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.created.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>

  )
}

export const revalidate=0;

export default issues