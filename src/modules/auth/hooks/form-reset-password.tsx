import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useResetPassword } from "@auth/queries/auth.queries"
import { toast } from "@shared/hooks/use-toast"
import { useTranslations } from "next-intl"

export function useFormResetPassword(token: string) {
  const router = useRouter()
  const { mutate: resetPassword, isPending } = useResetPassword()
  const t = useTranslations("auth.reset-password")
  const tValidation = useTranslations("common.validation")

  const FormSchema = z.object({
    token: z.string(),
    newPassword: z.string().min(8, tValidation("min-length", { min: 8 })),
    confirmPassword: z.string().min(8, tValidation("min-length", { min: 8 })),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: tValidation("password-mismatch"),
    path: ["confirmPassword"],
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    resetPassword({
      token: data.token,
      newPassword: data.newPassword,
    }, {
      onSuccess: () => {
        toast({
          title: t("success.title"),
          description: t("success.description"),
        })
        router.push("/auth/login")
      },
      onError: (error) => {
        toast({
          title: t("error.title"),
          description: error.message || t("error.description"),
          variant: "destructive",
        })
      },
    })
  }

  return {
    form,
    onSubmit,
    isPending,
  }
}