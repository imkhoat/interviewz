import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form";
import { useResetPassword } from "@auth/queries/auth.queries";
import { useToast } from "@shared/hooks/use-toast";
import { PasswordInput } from "@shared/components/extends/password-input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@shared/components/ui/card";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar";
import { Input } from "@shared/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  token: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

interface FormResetPasswordProps {
  token: string;
}

export function FormResetPassword({ token }: FormResetPasswordProps) {
  const { toast } = useToast();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: FormValues) {
    resetPassword({ token: data.token, newPassword: data.password }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Your password has been reset successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  }

  return (
    <Card className="page-login shadow-none border-0">
      <CardHeader className="flex flex-col justify-start items-center text-center">
        <Avatar className="w-20 h-20 bg-transparent">
          <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
            <Avatar className="w-16 h-16 bg-primary/0">
              <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
                <Avatar className="w-12 h-12 bg-primary/0">
                  <AvatarFallback className="bg-primary/0 ring-1 ring-inset ring-primary/10">
                    <ShieldCheck />
                  </AvatarFallback>
                </Avatar>
              </AvatarFallback>
            </Avatar>
          </AvatarFallback>
        </Avatar>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col justify-start items-stretch space-y-6">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Token</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Enter your new password" {...field} />
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
                    <PasswordInput placeholder="Confirm your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export function FormInvalidToken() {
  return (
    <Card className="page-login shadow-none border-0">
      <CardHeader className="flex flex-col justify-start items-center text-center">
        <Avatar className="w-20 h-20 bg-transparent">
          <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
            <Avatar className="w-16 h-16 bg-primary/0">
              <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
                <Avatar className="w-12 h-12 bg-primary/0">
                  <AvatarFallback className="bg-primary/0 ring-1 ring-inset ring-primary/10">
                    <AlertCircle />
                  </AvatarFallback>
                </Avatar>
              </AvatarFallback>
            </Avatar>
          </AvatarFallback>
        </Avatar>
        <CardTitle>Invalid Token</CardTitle>
        <CardDescription>
          The password reset token is invalid or has expired
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <p className="text-center text-muted-foreground">
          Please request a new password reset link to continue.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" asChild>
          <Link href="/auth/login">Back to login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}