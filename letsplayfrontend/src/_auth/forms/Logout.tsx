import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserContext } from "@/lib/context/authContext/UserContext";
import { useRef } from "react";

const Logout = () => {
  const { dispatch } = useUserContext();
  const cancelRef = useRef(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="hover: p-1 px-2 place-items-center rounded-lg bg-dimGray text-white flex gap-2">
          <span className="hidden sm:block">Logout</span>
          <img src="/assets/icons/logout_.svg" alt="Logout icon" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout My Account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? You can always log in again to
            chat with your friends.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => dispatch({ type: "DELETE_USER_SESSION" })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Logout;
