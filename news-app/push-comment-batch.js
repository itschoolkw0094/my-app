// import { PrismaClient } from '@prisma/client'
// import { title } from 'process';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

try {
  prisma.comment.create({
    data: {
      authorId:"cltxsd44d0000oo0t0f3sbkm4",
      newsId: "cltxs63l60000uhvbta3g0l28",
      type: false,
      title: "",
      content: "This is a test comment."
    }
  }).then(console.log('pushed'))
} catch(error) {
  console.error(error)
}

