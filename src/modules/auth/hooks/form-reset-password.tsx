import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { useResetPassword } from "@auth/queries/auth.queries"
import { toast } from "@shared/hooks/use-toast"

export function useFormResetPassword() {
  const router = useRouter()
  const { mutate: resetPassword, isPending } = useResetPassword()

  const FormSchema = z.object({
    email: z.string().email(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    resetPassword(data.email, {
      onSuccess: () => {
        toast({
          title: "Reset password email sent",
          description: "Please check your email for instructions to reset your password.",
        })
        router.push("/auth/login")
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to send reset password email. Please try again.",
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