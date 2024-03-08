import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

type InputData = {
  content: string
}

const InputArea = () => {

  console.log('called')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<InputData>()


  const onSubmit = async (data: InputData) => {
    //todo
    console.log(data.content)
  }

  const [isOpenOffcanvas, setIsOpenOffcanvas] = useState(false)

  return (
    <div>
    {/* {isOpenOffcanvas ?
    ( */}
      <div id="hs-overlay-bottom" className={`hs-overlay hs-overlay-open:translate-y-0 translate-y-full transition-all duration-300 fixed bottom-0 inset-x-0 transform max-h-40 size-full z-[80] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hidden`} tabIndex={-1}>
  <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
    <h3 className="font-bold text-gray-800 dark:text-white">
      Offcanvas title
    </h3>
    <button 
    // onClick={() => openOffcanvas()}
    type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      data-hs-overlay="#hs-overlay-bottom"
    >
      <span className="sr-only">Close modal</span>
      <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  </div>
  <div className="p-4">
    <p className="text-gray-800 dark:text-6-400">
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
    </p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('content', { required: true })}></input>
      <button type="submit" data-hs-overlay="#hs-overlay-bottom">send</button>
    </form>
  </div>
</div>
    {/* ):
    ( */}
      <div className="fixed bottom-0 inset-x-0 transform w-full items-center bg-white">
        <button
          type="button" 
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          // onClick={openOffcanvas}
          data-hs-overlay="#hs-overlay-bottom"
          >
          Comment for this areticle !
        </button>
      </div>
    {/* )} */}

    </div>
  )
}

export default InputArea