import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import MapPicker from "./MapPicker";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/lib/context/authContext/UserContext";
import {
  CREATE_USER_PROFILE,
  LOAD_ON_PROFILE_UPDATE,
} from "@/lib/context/authContext/actions";
import { createProfile, updateProfile } from "@/lib/actions/createProfile";
import Loader from "@/components/shared/Loader";
import { fetchProfile } from "@/lib/actions/fetchProfile";

const formSchema = z.object({
  dob: z.string().min(2, {
    message: "Date of birth must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  location: z.string().min(1, {
    message: "Location cannot be empty.",
  }),
  gender: z.string().min(1, {
    message: "Gender must be chosen.",
  }),
  phone: z.string().min(10, {
    message: "Phone must be at least 10 characters.",
  }),
});

const ProfileForm = () => {
  const { state, dispatch } = useUserContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
      dob: "",
      location: "",
      gender: "",
      phone: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchProfile(state.user.id);
        if (data) {
          dispatch({ type: CREATE_USER_PROFILE, payload: data });
          setValue("bio", data.bio);
          setValue("dob", data.dob);
          setValue("location", data.location);
          setValue("gender", data.gender);
          setValue("phone", data.phone);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadProfile();
  }, [state.user.id, dispatch, setValue]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({ type: LOAD_ON_PROFILE_UPDATE });

    try {
      let profileData;

      if (state.user_profile.dob) {
        // Profile exists, update it
        profileData = await updateProfile(state.user_profile.id, {
          ...values,
          user: state.user.id,
        });
      } else {
        // Profile does not exist, create it
        profileData = await createProfile({
          ...values,
          user: state.user.id,
        });
      }

      dispatch({ type: CREATE_USER_PROFILE, payload: profileData?.data });
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: LOAD_ON_PROFILE_UPDATE });
  }

  return (
    <div className="mx-auto w-3/5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <MapPicker
                    onLocationSelect={(location) => {
                      field.onChange(`${location.lat}, ${location.lng}`);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <>
                <RadioGroup
                  value={field.value} // Set the selected value
                  onValueChange={field.onChange} // Update the value when selection changes
                  className="flex justify-around"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="M" id="option-one" />
                    <Label htmlFor="option-one">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="F" id="option-two" />
                    <Label htmlFor="option-two">Female</Label>
                  </div>
                </RadioGroup>
                <FormMessage />
              </>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {state.isUpdatingProfile ? <Loader /> : ""}
            {state.user_profile.dob === ""
              ? "Create profile"
              : "Update profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
