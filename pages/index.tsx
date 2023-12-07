import type { GetServerSideProps, NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useState } from "react";

import Layout from "../components/Layout";
import Loader from "../components/Loader";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");

  const { isLoading, data } = trpc.useQuery(["users.all", { email: search }]);

  return (
    <Layout pageTitle="Users List" btnText="+ Add User" navPathName="/create">
      <div className="container mx-auto mt-8">
        {isLoading ? (
          <div className="h-45vh justify-center items-center flex">
            <Loader color="#009EEB" />
          </div>
        ) : (
          <table className="table-auto w-full">
            <thead className="bg-grey">
              <tr>
                <th className="p-4 text-left">S.No.</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(
                  (
                    { id, name, email, phoneNumber, gender, image, address },
                    index
                  ) => (
                    <tr key={`user_${id}`}>
                      <td className="p-4 border border-solid">{index}</td>
                      <td className="p-4 border border-solid">{name}</td>
                      <td className="p-4 border border-solid">{email}</td>
                      <td className="p-4 border border-solid">{phoneNumber}</td>
                      <td className="p-4 border border-solid">{gender}</td>
                      <td className="p-4 border border-solid">{address}</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies.accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
