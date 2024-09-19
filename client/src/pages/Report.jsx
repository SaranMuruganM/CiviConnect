import React from 'react'
import {Form} from 'react-router-dom'
import {FormRow} from '../components'
const Report = () => {
  return (
    <Form className='w-[50vw] mx-auto grid p-4 mt-10 border'>
      <h1 className="mx-auto mb-8">Report Issues</h1>
        <FormRow type={'text'} labelText={"decription"}/>
        
    </Form>
  )
}

export default Report