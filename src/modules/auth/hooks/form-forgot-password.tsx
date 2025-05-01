import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useForgotPassword } from "@auth/queries/auth.queries"
import { toast } from "@shared/hooks/use-toast"
import { useTranslations } from "next-intl"

export function useFormForgotPassword() {
  const router = useRouter()
  const { mutate: forgotPassword, isPending } = useForgotPassword()
  const t = useTranslations("auth.forgot-password")
  const tValidation = useTranslations("common.validation")

  const FormSchema = z.object({
    email: z.string().email(tValidation("email")),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    forgotPassword(data.email, {
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