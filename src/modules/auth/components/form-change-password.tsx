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

const formSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type FormValues = z.infer<typeof formSchema>

export default function FormChangePassword() {
  const { toast } = useToast()
  const { mutate: changePassword, isPending } = useChangePassword()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: FormValues) {
    changePassword(
      {
        password: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Your password has been changed successfully",
          })
          form.reset()
        },
        onError: (error: Error) => {
          toast({
            title: "Error",
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
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password</CardDescription>
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
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Changing..." : "Change Password"}
              </Button>
              <Button type="button" variant={'secondary'}><Link href={'/'}>Back to homepage</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}