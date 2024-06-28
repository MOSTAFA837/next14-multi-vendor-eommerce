"use client";

import { FC, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

import { Brand } from "@prisma/client";

import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import ImageUpload from "@/components/shared/image-upload";
import { BrandFormSchema } from "@/lib/schemas";
import { upsertBrand } from "@/queries/brands";

interface BrandDetailsProps {
  data?: Brand | null;
}

const BrandDetails: FC<BrandDetailsProps> = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof BrandFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(BrandFormSchema),
    defaultValues: {
      name: data?.name,
      image: data?.image ? [{ url: data?.image }] : [],
      url: data?.url,
      featured: data?.featured,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.name,
        image: [{ url: data?.image }],
        url: data?.url,
        featured: data?.featured,
      });
    }
  }, [data, form]);

  const handleSubmit = async (values: z.infer<typeof BrandFormSchema>) => {
    try {
      const response = await upsertBrand({
        id: data?.id ? data.id : v4(),
        name: values.name,
        image: values.image[0].url,
        url: values.url,
        featured: values.featured,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast({
        title: data?.id
          ? "Brand has been updated."
          : `Congratulations! '${response?.name}' is now created.`,
      });

      if (data?.id) {
        router.refresh();
      } else {
        router.push("/dashboard/admin/brands");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error.toString(),
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Brand Information</CardTitle>
          <CardDescription>
            {data?.id
              ? `Update ${data?.name} brand information.`
              : " Lets create a brand. You can edit brand later from the brands table or the brand page."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        type="profile"
                        value={field.value.map((image) => image.url)}
                        disabled={isLoading}
                        onChange={(url) => field.onChange([{ url }])}
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.url !== url
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>brand name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>brand url</FormLabel>
                    <FormControl>
                      <Input placeholder="/brand-url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This brand will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="bgGradient">
                {isLoading
                  ? "loading..."
                  : data?.id
                  ? "Save brand information"
                  : "Create brand"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default BrandDetails;
