import Profile from "../../component/Profile";
import { useEffect, useState } from "react";

export default function ProfileDetails({ setPostList, postList }) {
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

  return (
    <Profile
      userData={userDetails}
      userId={id}
      setPostList={setPostList}
      postList={postList}
    ></Profile>
  );
}
