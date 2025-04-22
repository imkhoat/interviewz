import { z } from "zod"
import { useForm } from "react-hook-form"
import { toast } from "@shared/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"

export function useFormChangePassword() {

  const FormSchema = z.object({
    password: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
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
    console.log(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-primary p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return {
    form,
    onSubmit
  }
}