import { type NextPage } from "next";
import Head from "next/head";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quotes</title>
        <meta name="description" content="An app for quotes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div>single post page</div>
      </main>
    </>
  );
};

export default SinglePostPage;
