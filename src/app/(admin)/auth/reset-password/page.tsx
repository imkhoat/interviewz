"use client"

import { useSearchParams } from "next/navigation"
import { FormResetPassword } from "@auth/components/form-reset-password"

export default function PageResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  if (!token) {
    return <div>Invalid or missing token</div>
  }

  return <FormResetPassword token={token} />
}
