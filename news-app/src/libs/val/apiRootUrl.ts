let apiRootUrl: string;

if (process.env.NODE_ENV === "production") {
  apiRootUrl = "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
} else {
  apiRootUrl = "http://localhost:3000";
}

export default apiRootUrl;