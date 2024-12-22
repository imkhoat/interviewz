"use client"

import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { ShieldCheck } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'


const FormSchema = z.object({
  password: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
})

export default function PageChangePassword() {
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
              <ShieldCheck />
            </AvatarFallback>
          </Avatar>
        </AvatarFallback>
      </Avatar>
      <CardTitle>Change password</CardTitle>
      <CardDescription>Please confirm current password and enter new password</CardDescription>
    </CardHeader>
    <CardContent className="pb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col justify-start items-stretch space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
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
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
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
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-2">
            <Button type="submit">Change password</Button>
            <Button type="button" variant={'secondary'}><Link href={'/'}>Back to homepage</Link></Button>
          </div>
        </form>
      </Form>
    </CardContent>
  </Card>
}
