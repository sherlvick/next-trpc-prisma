import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <header className="bg-darkBlue">
        <div className="container mx-auto py-4 flex flex-row justify-between">
          <h1 className="text-3xl text-white">Users List</h1>
          <button className="bg-white hover:bg-grey hover:shadow-2xl text-black font-bold py-2 px-4 rounded">
            <span>+</span> Add User
          </button>
        </div>
      </header>
      {children}
    </main>
  );
}
