import "../styles/globals.css";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../server/router";
import SnackbarProvider from "react-simple-snackbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider><Component {...pageProps} /></SnackbarProvider>
  );
}

const getLinks = () => {
  const httpLink = httpBatchLink({
    url: `/api/trpc`,
  });

  return httpLink;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        getLinks(),
      ],
      // transformer: superjson,
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(App);
