import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useChangePassword } from "@auth/queries/use-change-password"

export function useFormChangePassword() {
  const { mutate: changePassword, isPending } = useChangePassword()

  const FormSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    changePassword({
      password: data.password,
      newPassword: data.newPassword,
    })
  }

  return {
    form,
    onSubmit,
    isPending
  }
}