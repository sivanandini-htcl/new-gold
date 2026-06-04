import React from 'react'

const TestingPage = () => {
  return (
    <div className="animate-pulse p-5">
     <div className="animate-pulse flex gap-4 mt-1  mb-4 ">
    <div className="h-full px-3 w-full bg-secondary/8 rounded-2xl ">

    <div className='  rounded-lg p-4  gap-4'>
    <div className='grid grid-cols-1 gap-3 h-40  p- rounded-2xl bg-secondary/7 mt-3 '>

<div className='flex justify-between p-4 gap-3'>
    <div className='h-2 w-50 p-4 bg-secondary/10 rounded-2xl'/>
    <div className='h-2 w-50 p-4 bg-secondary/10 rounded-2xl'/>
</div>

<div className='flex gap-3 justify-between p-4'>
    <div className='h-2 w-50 p-4 bg-secondary/10 rounded-2xl'/>
    <div className='h-2 w-50 p-4 bg-secondary/10 rounded-2xl'/>
</div>
    </div>
    </div>
    </div>

   </div>
<div className='h-full w-full bg-secondary/8 rounded-2xl mb-4'>
 <div className='rounded-lg p-4 grid grid-cols-3 md:grid-cols-6  gap-4'>
 {[...Array(6)].map((_,index)=>(

       <div   key={index} className="h-20 w- bg-secondary/8 rounded-2xl"/>
  ))}
    </div></div>

<div className='flex gap-3 mb-4'>
    <div className='h-60 w-full rounded-2xl bg-secondary/7'/>
    <div className='h-60 w-full rounded-2xl bg-secondary/7'/>
</div>
<div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-2 '>
   {[...Array(4)].map((_,index)=>(
    <div key={index} className='w-full h-30 rounded-2xl bg-secondary/7'/>
   ))}
</div>
    </div>
  )
}

export default TestingPage