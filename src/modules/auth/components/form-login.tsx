import { LogIn } from "lucide-react"
import Link from "next/link"
import React from "react"
import { useTranslations } from "next-intl"

import { useFormLogin } from "@auth/hooks/form-login"
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar"
import { Button } from "@shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@shared/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form"
import { Input } from "@shared/components/ui/input"
import { PasswordInput } from "@shared/components/extends/password-input"

export default function FormLogin() {
  const t = useTranslations("auth.signin")
  const { form, onSubmit, isPending } = useFormLogin()

  return (
    <Card className="page-login shadow-none border-0">
      <CardHeader className="flex flex-col justify-start items-center text-center">
        <Avatar className="w-20 h-20 bg-transparent">
          <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
            <Avatar className="w-16 h-16 bg-primary/0">
              <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
                <Avatar className="w-12 h-12 bg-primary/0">
                  <AvatarFallback className="bg-primary/0 ring-1 ring-inset ring-primary/10">
                    <LogIn />
                  </AvatarFallback>
                </Avatar>
              </AvatarFallback>
            </Avatar>
          </AvatarFallback>
        </Avatar>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col justify-start items-stretch space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("email-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-between items-baseline">
                    <FormLabel>{t("password")}</FormLabel>
                    <Link href={'/auth/forgot-password'} className="underline text-xs text-right">{t("forgot-password")}</Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder={t("password-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? t("loading") : t("submit")}
              </Button>
              <Button type="submit" variant={'secondary'} disabled={isPending}>{t("google")}</Button>
              <Button type="submit" variant={'secondary'} disabled={isPending}>{t("github")}</Button>
              <Button type="button" variant={'link'}><Link href={'/auth/signup'}>{t("no-account")}</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}