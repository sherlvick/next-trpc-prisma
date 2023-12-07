import { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import { useState } from "react";
import Image from "next/image";
import { useSnackbar } from "react-simple-snackbar";
import { snackBarErrorOptions } from "../utils";
import { trpc } from "../utils/trpc";

const Login: NextPage = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar] = useSnackbar(snackBarErrorOptions);
  const { isLoading, mutate } = trpc.useMutation(["auth.login"], {
    onSuccess: (value) => {
      router.replace("/");
      // window.location.reload();
    },
    onError: (err) => {
      openSnackbar(err.message);
    },
  });

  const login = () => {
    if (username.trim() === "") {
      return openSnackbar("Please Enter Employee ID");
    }

    if (password.trim() === "") {
      return openSnackbar("Please Enter password");
    }

    mutate({
      username,
      password,
    });
  };

  return (
    <div className="h-93vh flex flex-col">
      <div className="flex justify-center grow">
        <div className="flex flex-col mt-5 items-center">
          <Image
            src="/pngwing.com.png"
            alt="DMF"
            className="mb-7"
            width={100}
            height={100}
          />

          <div className={`flex flex-col w-80`}>
            <h1 className="text-[#264A98] text-sm text-left">Employee ID</h1>
            <input
              className="text-gray-600 px-2 w-80 mb-5 rounded text-sm h-10 border-2 focus:outline-none focus:border-[#264A98]"
              type="text"
              value={username}
              maxLength={45}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={`flex flex-col w-80`}>
            <h1 className="text-[#264A98] text-sm text-left">Password</h1>
            <input
              className="text-gray-600 px-2 w-80 mb-5 rounded text-sm h-10 border-2 focus:outline-none focus:border-[#264A98]"
              type="password"
              value={password}
              maxLength={45}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-darkBlue cursor-pointer enabled:hover:bg-pink hover:shadow-2xl text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
