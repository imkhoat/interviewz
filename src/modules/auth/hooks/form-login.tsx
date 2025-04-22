import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "@auth/queries/auth.queries"

export function useFormLogin() {
  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
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