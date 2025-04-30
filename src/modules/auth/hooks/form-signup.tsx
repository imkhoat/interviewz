import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useSignup } from "@auth/queries/auth.queries"

export const UserRole = {
  INTERVIEWER: "interviewer",
  CANDIDATE: "candidate",
} as const

export type UserRoleType = typeof UserRole[keyof typeof UserRole]

export function useFormSignup() {

  const FormSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum([UserRole.INTERVIEWER, UserRole.CANDIDATE], {
      required_error: "Please select your role",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: UserRole.CANDIDATE,
    },
  })

  const { mutate: signup, isPending } = useSignup()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...signupData } = data
    signup(signupData)
  }

  return {
    form,
    onSubmit,
    isPending,
  }
}