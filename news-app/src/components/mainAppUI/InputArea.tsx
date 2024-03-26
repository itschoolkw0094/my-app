"use client"

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type InputData = {
  content: string
}

const InputArea = (props: {articleId: string}) => {

  const {data: session} = useSession()

  const router = useRouter()

  // console.log('called')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<InputData>()


  const onSubmit = async (input: InputData) => {
    setIsOpenOffcanvas(false)

    const req = {
      authorId: session?.user?.id,
      authorName: session?.user?.name || 'Anonymous',
      newsId: props.articleId,
      content: input.content,
    }
    
    const res = await fetch('http://localhost:3000/api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
    if(res) {

      router.refresh()
    }
  }

  const [isOpenOffcanvas, setIsOpenOffcanvas] = useState<boolean>(false)

  const toggleOffcanvas = () => {
    const v = !isOpenOffcanvas
    setIsOpenOffcanvas(v)
  }

  return (
    <>
      <div id="" className={`hs-overlay translate-y-0 bottom-0 inset-x-0 transition-all duration-300 fixed transform max-h-60 size-full z-[80] bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${isOpenOffcanvas ? "" : "translate-y-full"}`} tabIndex={-1}>
  <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
    <h3 className="font-bold text-gray-800 dark:text-white">
      Comment For This Article
    </h3>
    <button 
    onClick={() => toggleOffcanvas()}
    type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      data-hs-overlay="#hs-overlay-bottom"
    >
      <span className="sr-only">Close modal</span>
      <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  </div>
  <div className="p-4">
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center size-full">
      <textarea {...register('content', { required: true })} id="content" name="content" rows={3} className="w-full block"></textarea>
      <button type="submit" className="w-1/2 my-3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Send !</button>
    </form>
  </div>
</div>
      <div className="fixed bottom-0 inset-x-0 transform w-full items-center bg-white">
        <button
          type="button" 
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={() => toggleOffcanvas()}
          // data-hs-overlay="#hs-overlay-bottom"
          >
          Comment for this areticle !
        </button>
      </div>
    </>
  )
}

export default InputArea