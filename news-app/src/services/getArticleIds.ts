import prisma from "@/libs/prisma";

export const getArticleIds = () => {
  const result = new Array<string>();

  prisma.news
    .findMany({
      select: {
        id: true,
      },
    })
    .then((data) => {
      data.map((v) => {
        result.push(v.id);
      });
    });

  return result;
};
