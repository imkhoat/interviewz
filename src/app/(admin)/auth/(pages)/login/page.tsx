"use client"

import { z } from "zod"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LogIn } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'


const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default function PageLogin() {
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
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return <Card className="page-login shadow-none border-0">
    <CardHeader className="flex flex-col justify-start items-center text-center">
      <Avatar className="w-14 h-14 bg-transparent">
        <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/10">
          <Avatar className="w-10 h-10 bg-transparent">
            <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/80">
              <LogIn />
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
                  <Link href={'/auth/forgot-password'} className="underline text-xs text-right">Forgot password?</Link>
                </div>
                <FormControl>
                  <Input placeholder="********" {...field} />
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
}
