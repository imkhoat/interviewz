import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { useForgotPassword } from "@auth/queries/auth.queries";
import { useToast } from "@shared/hooks/use-toast";
import { useTranslations } from "next-intl";
import { KeyRound } from 'lucide-react';
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar";

export function FormForgotPassword() {
  const { toast } = useToast();
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const t = useTranslations("auth.forgot-password");
  const tValidation = useTranslations("common.validation");

  const formSchema = z.object({
    email: z.string().email(tValidation("email")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    forgotPassword(data.email, {
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
                    <KeyRound />
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
                    <Input
                      type="email"
                      placeholder={t("email-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? t("loading") : t("submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center">
          <span className="text-muted-foreground">{t("remember-password")}</span>{' '}
          <a href="/auth/login" className="text-primary hover:underline">
            {t("back-to-login")}
          </a>
        </div>
      </CardFooter>
    </Card>
  );
} 