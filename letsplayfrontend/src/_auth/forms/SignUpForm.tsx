import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserContext } from "@/lib/context/authContext/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/actions/createUser";
import Loader from "@/components/shared/Loader";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  firstname: z.string().min(2, { message: "Name must be longer than 2" }),
  lastname: z.string().min(2, { message: "Name must be longer than 2" }),
  password: z
    .string()
    .min(8, { message: "Passwords should be at least 8 characters long" }),
});

const SignUpForm = () => {
  const { dispatch, state } = useUserContext();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({ type: "LOAD_ON_CREATE_USER" });
    // Do something with the form values.
    const response = await createUserAccount(values);
    dispatch({ type: "CREATE_USER", payload: values });
    // ✅ This will be type-safe and validated.
    // console.log(values);
    dispatch({ type: "LOAD_ON_CREATE_USER" });

    toast({
      title: "Success!",
      description: "Your account was created successfully.",
    });
    form.reset();
    window.location.replace("/sign-in");
    return response;
  }

  return (
    <section className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {/* Create account */}
            {state.isCreateAccountLoading ? (
              <div className="flex gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <p className="text-pear">
          Already have an account?{" "}
          <Link className="underline" to={"/sign-in"}>
            Sign in here.
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default SignUpForm;
