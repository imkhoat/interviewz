import { ShieldQuestion } from "lucide-react"
import Link from "next/link"

import { useFormResetPassword } from "@auth/hooks/form-reset-password"
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


export default function FormResetPassword() {

  const { form, onSubmit, isPending } = useFormResetPassword()

  return (
    <Card className="page-login shadow-none border-0">
      <CardHeader className="flex flex-col justify-start items-center text-center">
        <Avatar className="w-20 h-20 bg-transparent">
          <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
            <Avatar className="w-16 h-16 bg-primary/0">
              <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
                <Avatar className="w-12 h-12 bg-primary/0">
                  <AvatarFallback className="bg-primary/0 ring-1 ring-inset ring-primary/10">
                    <ShieldQuestion />
                  </AvatarFallback>
                </Avatar>
              </AvatarFallback>
            </Avatar>
          </AvatarFallback>
        </Avatar>
        <CardTitle>Forgot password</CardTitle>
        <CardDescription>A reset password email will send to your mailbox</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col justify-start items-stretch space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Request"}
              </Button>
              <Button type="button" variant={'secondary'}><Link href={'/auth/login'}>Back to login</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}