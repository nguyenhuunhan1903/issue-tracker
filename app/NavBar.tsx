'use client'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
const NavBar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  const links = [
    { label: 'dashboard', link: '/' },
    { label: 'issues', link: '/issues' },
  ]
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify="between">
          <Flex align="center">
            <Link href={'/'}><AiFillBug /></Link>
            <ul className='flex space-x-6'>
              {links.map((x) => <li key={x.link}><Link className={`${currentPath === x.link ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`} href={x.link}>{x.label}</Link></li>)}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2" radius='full'
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">
                      {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link href="/api/auth/signin">Sign in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar