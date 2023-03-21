import Profile from "../../component/Profile";
import { useEffect, useState } from "react";

export default function ProfileDetails() {
  const id = "64196fcd3b78a48001ecaecf";
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/users/${id}`);
      const dataResponse = await data.json();

      setUserDetails(dataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  //   console.log("user", userDetails);
  //   const { _id, username, email_id, contactno } = userDetails;
  //   console.log(_id, username, email_id, contactno);
  return <Profile userData={userDetails}></Profile>;
}
