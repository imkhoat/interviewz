import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTranslations } from "next-intl"

import { useChangePassword } from "@auth/queries/use-change-password"

export function useFormChangePassword() {
  const { mutate: changePassword, isPending } = useChangePassword()
  const t = useTranslations("common.validation")

  const FormSchema = z.object({
    password: z.string().min(8, t("min-length", { min: 8 })),
    newPassword: z.string().min(8, t("min-length", { min: 8 })),
    confirmPassword: z.string().min(8, t("min-length", { min: 8 })),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: t("password-mismatch"),
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