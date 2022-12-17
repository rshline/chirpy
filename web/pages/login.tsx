import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Formik, Form, Field } from "formik"
import { useLoginMutation } from '../generated/graphql'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { toErrorMap } from "../utils/toErrorMap"

function Login() {
    const router = useRouter()
    const [, login] = useLoginMutation()
  return (
    <div className='flex flex-col items-center justify-center h-screen p-4'>
        <h1 className='text-3xl font-bold my-4'>Sign in</h1>
        <Formik 
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login(values);
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/");
                }
              }
            }}
        >
            <Form className='flex flex-col'>
                <Field 
                    type='text' 
                    name="usernameOrEmail"
                    placeholder="E-mail or Username" 
                    className='w-full px-5 py-2 my-2 text-lg outline rounded-sm outline-1 outline-gray-400 focus:outline-twitter placeholder:text-lg'
                />
                <Field 
                    type='password' 
                    name='password'
                    placeholder="Password" 
                    className='w-full px-5 py-2 my-2 text-lg outline rounded-sm outline-1 outline-gray-400 focus:outline-twitter placeholder:text-lg'
                />
                <button type="submit" className='bg-twitter px-5 py-2 my-2 font-bold text-white rounded-full disabled:opacity-40'>
                    Log In
                </button>
            </Form>
        </Formik>
        <div>
          <p>Don't have an account? <span className='text-twitter cursor-pointer' onClick={() => router.replace("/register")}>Sign Up</span>
          </p>
        </div>
    </div>
  )
}

export default withUrqlClient(createUrqlClient)(Login)