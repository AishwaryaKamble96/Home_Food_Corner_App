import Profile from "../../component/Profile";
import { useEffect, useState } from "react";
import { getSession, useSession, signOut, signIn } from "next-auth/react";

export default function ProfileDetails({ setPostList, postList }) {
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState();

  // const getServerSideProps = async (context) => {
  //   const session = await getSession(context);
  //   console.log("session from profile", session);
  //   if (session === undefined) {
  //     return {
  //       redirect: {
  //         // destination: ["/profile"],
  //         destination: ["/login"],
  //       },
  //     };
  //   }
  //   return {
  //     props: { session },
  //   };
  // };
  let id;
  if (session) {
    id = session.user.id;
  }

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetch(`/api/users/${session.user.id}`);
      const userDataResponse = await userData.json();
      setUserDetails(userDataResponse);
    };
    fetchData().catch(console.error);
  }, []);
  if (session) {
    if (userDetails) {
      //return <p>Welcome, {session.user.name}</p>;
      console.log("userdetails", userDetails);

      return (
        <Profile
          userData={userDetails}
          userId={id}
          setPostList={setPostList}
          postList={postList}
        ></Profile>
      );
    }
  } else {
    return (
      <div>
        <p>You are not signed</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
}
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("session from profile", session);
  if (!session) {
    return {
      redirect: {
        // destination: ["/profile"],
        destination: ["/login"],
      },
    };
  }
  return {
    props: { session },
  };
};
