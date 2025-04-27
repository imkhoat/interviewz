import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useForgotPassword } from "@auth/queries/auth.queries"
import { toast } from "@shared/hooks/use-toast"

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export function useFormForgotPassword() {
  const router = useRouter()
  const { mutate: forgotPassword, isPending } = useForgotPassword()

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
          title: "Success",
          description: "Please check your email for password reset instructions",
        })
        router.push("/auth/login")
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to send reset password email",
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