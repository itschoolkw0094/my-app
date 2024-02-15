import { useSession } from "next-auth/react";

export const getIsAuthLoading = (): boolean => {
  const { status } = useSession()
  return status==='loading'
}