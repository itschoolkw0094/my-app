"use server";

import prisma from "@/libs/prisma";

/**
 * コメントのGood/Badボタン押下時のServer Action
 * @param userId
 * @param commentId
 * @param type true=Good, false=Bad
 * @returns
 */
export const sendRate = async (
  userId: string,
  commentId: string,
  type: boolean
) => {
  // TODO: 非ログイン時の処理
  if (userId == "Anonymous") {
    console.log("not logged in");
    return;
  }

  try {
    // RateForCommentテーブルにレコード作成
    await prisma.rateForComment.create({
      data: {
        userId: userId,
        commentId: commentId,
        type: type,
      },
    });

    // Commentレコードのカウントをインクリメント
    // レコード内に直接カウントを記録することでコードの煩雑化とデータベースへのアクセス増大を防ぎたい
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        goodCount: {
          increment: type ? 1 : 0,
        },
        badCount: {
          increment: type ? 0 : 1,
        },
      },
    });
  } catch (error) {
    // TODO: 例外処理
    console.error(error);
  }
};

export const checkRated = async (
  userId: string | undefined,
  commentId: string
) => {
  try {
    const result = await prisma.rateForComment.findFirst({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });

    if (result) return result.type ? 1 : -1;
    else return 0;
  } catch (error) {
    console.error(error);
  }
};

// /**
//  * コメントのGood/Badボタン再押下時のServer Action
//  * @param userId
//  * @param commentId
//  * @param type true=Good, false=Bad
//  * @returns
//  */
// export const deletedRate = async(userId: string, commentId: string, type: boolean) => {

//   // TODO: 非ログイン時の処理
//   if(userId == 'Anonymous') {
//     console.log('not logged in')
//     return
//   }

//   try {
//     // RateForCommentテーブルからレコード削除
//     await prisma.rateForComment.delete(
//       {
//         where: {
//           userId: userId,
//           commentId: commentId
//         }
//       }
//     )

//     // Commentレコードのカウントをインクリメント
//     // レコード内に直接カウントを記録することでコードの煩雑化とデータベースへのアクセス増大を防ぎたい
//     await prisma.comment.update(
//       {
//         where: {id: commentId},
//         data: {
//           goodCount: {
//             increment: (type ? 1 : 0),
//           },
//           badCount: {
//             increment: (type ? 0 : 1)
//           }
//         }
//       }
//     )

//   } catch(error) {
//     // TODO: 例外処理
//     console.error(error)
//   }
// }
