
import { LogIn, Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import React from "react"

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



export default function FormChangePassword() {

  const { form, onSubmit } = useFormLogin()

  const [isShowPassword, setIsShowPassword] = React.useState(false)

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
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to log in</CardDescription>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-between items-baseline">
                    <FormLabel>Password</FormLabel>
                    <Link href={'/auth/reset-password'} className="underline text-xs text-right">Forgot password?</Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                    <Input placeholder="********" {...field} type={isShowPassword ? "text": "password"} />
                    <Button size="icon" variant="link" type="button" className="absolute top-1/2 right-1 -translate-y-1/2" onClick={() => setIsShowPassword(!isShowPassword)}>
                      {isShowPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-2">
              <Button type="submit">Login with username</Button>
              <Button type="submit" variant={'secondary'}>Login with Google</Button>
              <Button type="submit" variant={'secondary'}>Login with Github</Button>
              <Button type="button" variant={'link'}><Link href={'/auth/signup'}>Dont have account? Signup</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}