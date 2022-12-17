import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRegisterMutation } from '../generated/graphql'
import { Formik, Form, Field } from "formik"
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { toErrorMap } from "../utils/toErrorMap"

function Register() {
  const router = useRouter()
  const [, register] = useRegisterMutation()

  return (
    <div className='flex flex-col items-center justify-center h-screen p-4'>
        <h1 className='text-3xl font-bold my-4'>Sign up</h1>
        <Formik 
          initialValues={{ name: "", email: "", username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ options: values });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        >
            <Form className='flex flex-col'>
                <Field 
                    type='text' 
                    name="name"
                    placeholder="Name" 
                    className='w-full px-5 py-2 my-2 text-lg outline rounded-sm outline-1 outline-gray-400 focus:outline-twitter placeholder:text-lg'
                />
                <Field 
                    type='text' 
                    name="username"
                    placeholder="Username" 
                    className='w-full px-5 py-2 my-2 text-lg outline rounded-sm outline-1 outline-gray-400 focus:outline-twitter placeholder:text-lg'
                />
                <Field 
                    type='email' 
                    name="email"
                    placeholder="Email" 
                    className='w-full px-5 py-2 my-2 text-lg outline rounded-sm outline-1 outline-gray-400 focus:outline-twitter placeholder:text-lg'
                />
                <Field 
                    type='password' 
                    name='password'
                    placeholder="Password" 
                    className='w-full px-5 py-2 my-2 text-lg outline rounded-sm outline-1 outline-gray-400 focus:outline-twitter placeholder:text-lg'
                />
                <button type="submit" className='bg-twitter px-5 py-2 my-2 font-bold text-white rounded-full disabled:opacity-40'>
                    Register
                </button>
            </Form>
        </Formik>
        <div>
          <p>Already have an account? <span className='text-twitter cursor-pointer' onClick={() => router.replace("/login")}>Sign In</span>
          </p>
        </div>
    </div>
  )
}

export default withUrqlClient(createUrqlClient)(Register)