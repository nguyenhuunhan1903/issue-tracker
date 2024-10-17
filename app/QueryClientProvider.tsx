'use client';
import React, { PropsWithChildren } from 'react'
import {QueryClient,QueryClientProvider as ReactQueryClient} from '@tanstack/react-query'
const queryClient=new QueryClient();

const QueryClientProvider = ({children}:PropsWithChildren) => {
  return (
   <ReactQueryClient client={queryClient} >
    {children}
   </ReactQueryClient>
  )
}

export default QueryClientProvider