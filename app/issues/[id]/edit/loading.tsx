import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const loading = () => {
  return (
    <div><div>
    <p><Skeleton/></p>
    <p><Skeleton/></p>
    <p><Skeleton/></p>
    <p><Skeleton/></p>
</div></div>
  )
}

export default loading