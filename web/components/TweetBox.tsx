import React, { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { Form, Formik, Field} from "formik";
import { useRouter } from 'next/router';
import { useIsAuth } from '../utils/useIsAuth';
import { useCreateTweetMutation } from "../generated/graphql";
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'


function TweetBox() {
    const [input, setInput] = useState<string>('')

    const router = useRouter()
    useIsAuth()
    const [, createTweet] = useCreateTweetMutation()

    return (
        <div className='flex space-x-2 p-5'>
            <img className='h-14 w-14 rounded-full object-cover mt-4' src='https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg' />
            <div className='flex flex-1 items-center pl-2'>
                <Formik
                    initialValues={{ text: "" }}
                    onSubmit={async (values) => {
                        const { error } = await createTweet({ input: values });
                        if (!error) {
                            router.push("/")
                            setInput("")
                        }
                    }}
                >
                    <Form className='flex flex-1 flex-col'>
                        <Field 
                            type='text'
                            name='text' 
                            value={input}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                            placeholder="What's happening?" 
                            className='h-24 w-full text-xl outline-none placeholder:text-xl'
                        />
                        <div className='flex items-center'>
                            <div className='flex flex-1 space-x-2 text-twitter'>
                                <PhotoIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            </div>
                            <button disabled={!input} type="submit" className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>Tweet</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(TweetBox)