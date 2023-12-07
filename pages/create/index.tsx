import { NextPage } from "next";
import Layout from "../../components/Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useSnackbar } from "react-simple-snackbar";
import { snackBarErrorOptions } from "../../utils";

interface AddUserFormValues {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  // image: imageBytes,
  gender: "MALE" | "FEMALE" | "OTHERS";
}

const initialValues: AddUserFormValues = {
  name: "",
  phoneNumber: "",
  email: "",
  address: "",
  gender: "OTHERS",
};

const CreateUser: NextPage = ({}) => {
  const router = useRouter();
  const [openSnackbar] = useSnackbar(snackBarErrorOptions);
  const { mutateAsync } = trpc.useMutation("users.create", {
    onSuccess: (data) => {
      // Actions to perform after successful mutation
      router.push("/");

      // You can trigger additional actions, update state, or navigate to another page, etc.
    },
    onError: (e) => openSnackbar(e.message, 6000),
  });

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  function validatePhoneNumber(value: string) {
    let error;
    if (!value) {
      error = "Required";
    } else if (
      !/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/i.test(
        value
      )
    ) {
      error = "Invalid phone number";
    }
    return error;
  }
  return (
    <Layout pageTitle="Add User" btnText="View Users" navPathName="/">
      <div className="container mx-auto mt-8">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            console.log({ values, actions });
            await mutateAsync(values);
            actions.resetForm({ values: initialValues });
            actions.setSubmitting(false);
          }}
          validateOnBlur
        >
          {({ isValid, dirty }) => {
            return (
              <Form className="max-w-lg mx-auto">
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone Number
                  </label>
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+91-9739743203"
                    validate={validatePhoneNumber}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    component="div"
                    name="phoneNumber"
                    className="text-red-600"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    validate={validateEmail}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="text-red-600"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Address
                  </label>
                  <Field
                    id="address"
                    name="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div role="group" className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    <Field
                      type="radio"
                      name="gender"
                      value="MALE"
                      className="mr-4"
                    />
                    Male
                  </label>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    <Field
                      type="radio"
                      name="gender"
                      value="FEMALE"
                      className="mr-4"
                    />
                    Female
                  </label>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    <Field
                      type="radio"
                      name="gender"
                      value="OTHERS"
                      className="mr-4"
                    />
                    Others
                  </label>
                </div>
                <button
                  disabled={!isValid || !dirty}
                  className="bg-darkBlue cursor-pointer enabled:hover:bg-pink hover:shadow-2xl text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  Save
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default CreateUser;
