import { z } from "zod"
import { useForm } from "react-hook-form"
import { toast } from "@shared/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"

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