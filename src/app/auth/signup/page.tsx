"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { User2Icon } from 'lucide-react';

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(8),
  confirmPassword: z.string().min(6).max(8),
})

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
    <CardHeader className="flex flex-col justify-start items-center">
      <Avatar className="w-14 h-14 bg-transparent">
        <AvatarFallback className="bg-transparent ring-1 ring-inset ring-neutral-100">
          <Avatar className="w-10 h-10 bg-transparent">
            <AvatarFallback className="bg-transparent ring-2 ring-inset ring-neutral-200">
              <User2Icon />
            </AvatarFallback>
          </Avatar>
        </AvatarFallback>
      </Avatar>
      <CardTitle>Create new account</CardTitle>
      <CardDescription>Enter your email to create new account</CardDescription>
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
            <Button type="submit">Signup with email</Button>
            <Button type="submit" variant={'secondary'}>Signup with Google</Button>
            <Button type="submit" variant={'secondary'}>Signup with Github</Button>
          </div>
        </form>
      </Form>
    </CardContent>
  </Card>
}
