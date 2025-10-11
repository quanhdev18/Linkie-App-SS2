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
import Loader from "@/components/shared/Loader";
import { loginUser } from "@/lib/actions/loginUser";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(8, { message: "Passwords should be at least 8 characters long" }),
});

const SignInForm = () => {
  const { dispatch, state } = useUserContext();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    dispatch({ type: "LOAD_ON_LOGIN_USER" });
    // ✅ This will be type-safe and validated.
    // console.log(values);

    try {
      const userData = await loginUser(values);
      // Do something with the user data

      dispatch({ type: "CREATE_USER_SESSION", payload: userData });
      dispatch({ type: "LOAD_ON_LOGIN_USER" });

      toast({
        title: "Login successful!",
      });
    } catch (error) {
      dispatch({ type: "LOAD_ON_LOGIN_USER" });
      toast({
        title: "Login failed!",
        description: "Username or password incorrect",
        variant: "destructive",
      });
      return error;
    }
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
            {state.isLoginLoading ? (
              <div className="flex gap-2">
                <Loader /> Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
        <p className="text-xanthous">
          You don't have an account?{" "}
          <Link className="underline" to={"/sign-up"}>
            Sign up here.
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default SignInForm;
