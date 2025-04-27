'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@shared/components/ui/input";
import { useUpdateUserProfile } from "../queries/setting.queries";
import { UserProfile } from "@setting/repositories/setting.repository";
import { useToast } from "@shared/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

interface FormProfileProps {
  profile: UserProfile;
}

export function FormProfile({ profile }: FormProfileProps) {
  const { toast } = useToast();
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      fullName: profile.fullName,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateProfile(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: values.fullName,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Profile updated successfully",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update profile",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
} 