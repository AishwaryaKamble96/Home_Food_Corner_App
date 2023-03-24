import Profile from "../../component/Profile";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function ProfileDetails({ setPostList, postList }) {
  const { data: session, status } = useSession({ required: true });
  const id = "64196fcd3b78a48001ecaecf";
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetch(`/api/users/${id}`);
      const userDataResponse = await userData.json();
      setUserDetails(userDataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  if (status === "authenticated") {
    //return <p>Welcome, {session.user.name}</p>;

    return (
      <Profile
        userData={userDetails}
        userId={id}
        setPostList={setPostList}
        postList={postList}
      ></Profile>
    );
    //}
  } else {
    return <p>You are not signed</p>;
  }
}
