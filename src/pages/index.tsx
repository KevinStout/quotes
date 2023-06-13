import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";
import { SignInButton, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile Image"
        className="flex h-14 w-14 rounded-md"
        height={56}
        width={56}
      />
      <input
        type="text"
        placeholder="Type a quote"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.profilePicture}
        alt={`${author.username}'s profile picture`}
        className="flex h-14 w-14 rounded-md"
        height={56}
        width={56}
      />
      <div className="flex flex-col bg-white text-slate-300">
        <span>{post.content}</span>
        <div>
          <span>{`By: ${author.username}`}</span>
          <span>{` · ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.posts.getAll.useQuery();
  console.log(user);
  if (isLoading) return <div>...Loading</div>;
  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            {!user.isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
            {user.isSignedIn && <CreatePostWizard />}
          </div>
          <div className="flex flex-col">
            {...data?.map((fullpost) => (
              <PostView {...fullpost} key={fullpost.post.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
