import { ReactNode } from "react";
import { useRouter } from "next/router";

export default function Layout({ pageTitle,btnText,navPathName,children }: { pageTitle:string,btnText:string,navPathName:string,children: ReactNode }) {
  const router = useRouter();

  const navClickHandler = () => {
    router.push(navPathName)
  }
  return (
    <main>
      <header className="bg-darkBlue">
        <div className="container mx-auto py-4 flex flex-row justify-between">
          <h1 className="text-3xl text-white">{pageTitle}</h1>
          <button className="bg-white hover:bg-grey hover:shadow-2xl text-black font-bold py-2 px-4 rounded" onClick={navClickHandler}>
            {btnText}
          </button>
        </div>
      </header>
      {children}
    </main>
  );
}
