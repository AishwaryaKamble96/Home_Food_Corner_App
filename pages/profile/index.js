import Profile from "../../component/Profile";
import { useEffect, useState } from "react";

export default function ProfileDetails() {
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

  // const userPostList = postList.filter((post) => post.user_id === id);

  // if (!userPostList) return null;

  // console.log("user", userDetails.username, userPostList);
  //   const { _id, username, email_id, contactno } = userDetails;
  //   console.log(_id, username, email_id, contactno);
  return <Profile userData={userDetails} userId={id}></Profile>;
}
