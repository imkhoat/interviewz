"use client"

import { useSearchParams } from "next/navigation"
import { FormResetPassword, FormInvalidToken } from "@auth/components/form-reset-password"

export default function PageResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  if (!token) {
    return <FormInvalidToken />
  }

  return <FormResetPassword token={token} />
}
