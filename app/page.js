import React from 'react'
import Table from '../components/Table'

function page() {
  return (
    <div>
      <h1 className='text-center my-10 text-2xl'>List of trending crypto in the market today</h1>
      <div className='max-w-screen-2xl px-10 m-auto'>
        <Table />
      </div>
    </div>
  )
}

export default page
