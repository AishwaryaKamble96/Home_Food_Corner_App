import Profile from "../../component/Profile";
import { useEffect, useState } from "react";
import { getSession, useSession, signOut, signIn } from "next-auth/react";

export default function ProfileDetails({ setPostList, postList }) {
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetch(`/api/users/${session.user.id}`, {
        method: "GET",
      });
      const userDataResponse = await userData.json();
      setUserDetails(userDataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  if (session) {
    const id = session.user.id;

    return (
      <Profile
        userData={userDetails}
        userId={id}
        setPostList={setPostList}
        postList={postList}
        setUserDetails={setUserDetails}
      ></Profile>
    );
  } else {
    return (
      <div>
        <p>You are not signed</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: { session },
  };
}
