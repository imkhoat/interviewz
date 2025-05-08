import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useVerifyEmail } from "@auth/queries/auth.queries"
import { toast } from "@shared/hooks/use-toast"
import { useTranslations } from "next-intl"

export function useFormVerifyEmail(token: string) {
  const router = useRouter()
  const { mutate: verifyEmail, isPending } = useVerifyEmail()
  const t = useTranslations("auth.verify-email")
  const tValidation = useTranslations("common.validation")

  const FormSchema = z.object({
    token: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyEmail(data.token, {
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