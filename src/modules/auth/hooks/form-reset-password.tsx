import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useResetPassword } from "@auth/queries/auth.queries"
import { toast } from "@shared/hooks/use-toast"

const FormSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export function useFormResetPassword(token: string) {
  const router = useRouter()
  const { mutate: resetPassword, isPending } = useResetPassword()

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
          title: "Success",
          description: "Your password has been reset successfully",
        })
        router.push("/auth/login")
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to reset password",
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