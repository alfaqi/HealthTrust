import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className=" text-white"
        style={{
          background: "linear-gradient(35deg, #11cdef 0, #1171ef 100%) ",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
