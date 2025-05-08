"use client"

import { useSearchParams } from "next/navigation"
import FormVerifyEmail from "@auth/components/form-verify-email"

export default function PageVerifyEmail() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  if (!token) {
    return null
  }

  return <FormVerifyEmail token={token} />
} 