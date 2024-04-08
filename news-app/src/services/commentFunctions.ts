"use server";

import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CommentTypeWithRated } from "@/types/data";

export async function getCommentSetWithRated(
  newsId: string,
  type: boolean,
  userId?: string
) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        newsId: newsId,
        type: type,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (userId) {
      const commentsWithRated: CommentTypeWithRated[] = [];
      await Promise.all(comments.map(async (comment) => {
        await prisma.rateForComment
          .findFirst({
            where: {
              commentId: comment.id,
              userId: userId,
            },
          })
          .then((rate) => {
            commentsWithRated.push({
              ...comment,
              isRated: rate ? rate.type : null,
            });
          });
      }));
      return commentsWithRated;
    } else return comments as CommentTypeWithRated[];
  } catch (error) {
    console.error(error);
  }
}
