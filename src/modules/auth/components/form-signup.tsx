import { User2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

import { useFormSignup, UserRole } from "@auth/hooks/form-signup";
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar";
import { Button } from "@shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { PasswordInput } from "@shared/components/extends/password-input";
import { RadioGroupField } from "@shared/components/extends/radio-group-field";

export default function FormSignup() {
  const { form, onSubmit, isPending } = useFormSignup();
  const t = useTranslations("auth.sign-up");

  return (
    <Card className="page-login shadow-none border-0">
      <CardHeader className="flex flex-col justify-start items-center text-center">
        <Avatar className="w-20 h-20 bg-transparent">
          <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
            <Avatar className="w-16 h-16 bg-primary/0">
              <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
                <Avatar className="w-12 h-12 bg-primary/0">
                  <AvatarFallback className="bg-primary/0 ring-1 ring-inset ring-primary/10">
                    <User2Icon />
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-start items-stretch space-y-6"
          >
            <div className="flex flex-row space-x-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("first-name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("first-name-placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("last-name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("last-name-placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("full-name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("full-name-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroupField
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      options={[
                        {
                          value: UserRole.INTERVIEWER,
                          label: "Interviewer",
                          description: "I want to conduct interviews and evaluate candidates",
                        },
                        {
                          value: UserRole.CANDIDATE,
                          label: "Candidate",
                          description: "I want to be interviewed and showcase my skills",
                        },
                      ]}
                    />
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
                  <FormLabel>{t("confirm-password")}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? t("submit-loading") : t("submit")}
              </Button>
              <Button type="submit" variant={"secondary"}>
                {t("google")}
              </Button>
              <Button type="submit" variant={"secondary"}>
                {t("github")}
              </Button>
              <Button type="button" variant={"link"}>
                <Link href={"/auth/login"}>{t("login")}</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
