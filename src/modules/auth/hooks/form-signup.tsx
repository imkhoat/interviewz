import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTranslations } from "next-intl"

import { useSignup } from "@auth/queries/auth.queries"

export const UserRole = {
  INTERVIEWER: "interviewer",
  CANDIDATE: "candidate",
} as const

export type UserRoleType = typeof UserRole[keyof typeof UserRole]

export function useFormSignup() {
  const t = useTranslations("common.validation")

  const FormSchema = z.object({
    firstName: z.string().min(2, t("min-length", { min: 2 })),
    lastName: z.string().min(2, t("min-length", { min: 2 })),
    fullName: z.string().min(2, t("min-length", { min: 2 })),
    email: z.string().email(t("email")),
    password: z.string().min(8, t("min-length", { min: 8 })),
    confirmPassword: z.string().min(8, t("min-length", { min: 8 })),
    role: z.enum([UserRole.INTERVIEWER, UserRole.CANDIDATE], {
      required_error: "Please select your role",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("passwordMismatch"),
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