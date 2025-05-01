import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTranslations } from "next-intl"

import { useLogin } from "@auth/queries/auth.queries"

export function useFormLogin() {
  const t = useTranslations("common.validation")

  const FormSchema = z.object({
    email: z.string().email(t("email")),
    password: z.string().min(8, t("min-length", { min: 8 })),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate: login, isPending } = useLogin()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    login(data)
  }

  return {
    form,
    onSubmit,
    isPending,
  }
}