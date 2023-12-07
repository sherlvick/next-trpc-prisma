import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "react-simple-snackbar";
import { trpc } from "../utils/trpc";
import { snackBarErrorOptions } from "../utils";

export default function Layout({ pageTitle, btnText, navPathName, children }: { pageTitle: string, btnText: string, navPathName: string, children: ReactNode }) {
  const router = useRouter();
  const [openSnackbar] = useSnackbar(snackBarErrorOptions);

  const { isLoading, mutate } = trpc.useMutation(["auth.logout"], {
    onSuccess: (value) => {
      router.replace("/login");
      // window.location.reload();
    },
    onError: (err) => {
      openSnackbar(err.message);
    },
  });

  const navClickHandler = () => {
    router.push(navPathName)
  }

  const logoutHandler = () => {
    mutate();
  }

  return (
    <main>
      <header className="bg-darkBlue">
        <div className="container mx-auto py-4 flex flex-row justify-between">
          <h1 className="text-3xl text-white">{pageTitle}</h1>
          <div>
            <button className="bg-white mr-4 hover:bg-grey hover:shadow-2xl text-black font-bold py-2 px-4 rounded" onClick={navClickHandler}>
              {btnText}
            </button>
            <button className="bg-white hover:bg-grey hover:shadow-2xl text-black font-bold py-2 px-4 rounded" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}
