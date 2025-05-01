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

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export function FormForgotPassword() {
  const { toast } = useToast();
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const t = useTranslations("auth.forgot-password");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: FormValues) {
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("email-placeholder")} {...field} />
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
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => window.history.back()}>
          {t("back-to-login")}
        </Button>
      </CardFooter>
    </Card>
  );
} 