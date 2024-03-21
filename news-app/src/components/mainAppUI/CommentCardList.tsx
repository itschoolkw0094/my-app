"use client";

import { useState, useCallback, useEffect } from "react";
import CommentCard from "./CommentCard";
import { CommentType } from "@/types/data";

const CommentCardList = (props: { comments: CommentType[] }) => {
  // const [prosComment, setProsComment] = useState<CommentType[]>([])
  // const [consComment, setConsComment] = useState<CommentType[]>([])

  // console.log(props.articleId)

  // useEffect(() => {
  //   const getComment = async(_type: string) => {
  //     const params = {
  //       newsId: props.articleId,
  //       type: _type

  //     }
  //     const query= new URLSearchParams(params)
  //     const res = await fetch(`http://localhost:3000/api/comment/getcomment?${query}`)
  //     const resJson = await res.json()

  //     if(_type === 'false') setProsComment(resJson)
  //     else setConsComment(resJson)
  //   }
  //   getComment('false')
  //   getComment('true')
  // }, [])

  return (
    <ul className="w-full h-full flex flex-col">
      <>
      {
        props.comments.map((comment) => {
            <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white">
            <CommentCard
              userIconUrl=""
              userName={comment.author}
              userId="@sample"
              content={comment.content}
              goodCount={0}
              badCount={0}
            />
            </li>
          })
        }
      </>
    </ul>
  );
};

export default CommentCardList;
