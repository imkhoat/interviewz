import { ShieldCheck } from "lucide-react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form"
import { useChangePassword } from "@auth/queries/auth.queries"
import { useToast } from "@shared/hooks/use-toast"
import { PasswordInput } from "@shared/components/extends/password-input"
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@shared/components/ui/card'
import { useTranslations } from "next-intl"

export default function FormChangePassword() {
  const { toast } = useToast()
  const { mutate: changePassword, isPending } = useChangePassword()
  const t = useTranslations("auth.change-password")
  const tValidation = useTranslations("common.validation")

  const formSchema = z.object({
    currentPassword: z.string().min(6, tValidation("min-length", { min: 6 })),
    newPassword: z.string().min(6, tValidation("min-length", { min: 6 })),
    confirmPassword: z.string().min(6, tValidation("min-length", { min: 6 })),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: tValidation("password-mismatch"),
    path: ["confirmPassword"],
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    changePassword(
      {
        password: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          toast({
            title: t("success.title"),
            description: t("success.description"),
          })
          form.reset()
        },
        onError: (error: Error) => {
          toast({
            title: t("error.title"),
            description: error.message,
            variant: "destructive",
          })
        },
      }
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>
              <ShieldCheck className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("current-password")}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder={t("current-password-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("new-password")}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder={t("new-password-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirm-password")}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder={t("confirm-password-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? t("loading") : t("submit")}
              </Button>
              <Button type="button" variant={'secondary'}><Link href={'/'}>{t("back-to-homepage")}</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}