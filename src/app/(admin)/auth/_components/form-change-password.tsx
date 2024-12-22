
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useFormChangePassword } from "@auth/_hooks/form-change-password"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'


export default function FormChangePassword() {

  const { form, onSubmit } = useFormChangePassword()

  return (
    <Card className="page-login shadow-none border-0">
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
  )
}