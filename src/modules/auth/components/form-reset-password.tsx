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
import { useTranslations } from "next-intl";
import { Alert } from "@/shared/components/ui/alert";

interface FormResetPasswordProps {
  token: string;
}

export function FormResetPassword({ token }: FormResetPasswordProps) {
  const { toast } = useToast();
  const { mutate: resetPassword, isPending } = useResetPassword();
  const t = useTranslations("auth.reset-password");
  const tValidation = useTranslations("common.validation");

  const formSchema = z.object({
    token: z.string(),
    password: z.string().min(6, tValidation("min-length", { min: 6 })),
    confirmPassword: z.string().min(6, tValidation("min-length", { min: 6 })),
  }).refine((data) => data.password === data.confirmPassword, {
    message: tValidation("password-mismatch"),
    path: ["confirmPassword"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    resetPassword({ token: data.token, newPassword: data.password }, {
      onSuccess: () => {
        toast({
          title: t("success.title"),
          description: t("success.description"),
        });
      },
      onError: (error) => {
        toast({
          title: t("error.title"),
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
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col justify-start items-stretch space-y-6">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("reset-token")}</FormLabel>
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
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder={t("password-placeholder")} {...field} />
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
            <Button type="submit" disabled={isPending}>
              {isPending ? t("loading") : t("submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export function FormInvalidToken() {
  const t = useTranslations("auth.reset-password.invalid-token");
  
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
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <Alert variant="destructive" className="text-center">
          {t("message")}
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" asChild>
          <Link href="/auth/login">{t("back-to-login")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}