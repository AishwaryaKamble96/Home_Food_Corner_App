import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import WishedButton from "../WishedButton";
import PostReviews from "../PostReviews";

export default function PostDetails({ postDetails, onToggleWished, wishList }) {
  const [postUserDetails, setPostUserDetails] = useState({});

  // destructure the postDetails object
  const {
    _id,
    name,
    image_url,
    content,
    price,
    date_of_availability,
    date_of_post,
    location,
    shipping_type,
    tag,
    user_id,
  } = postDetails;

  // Get user name based on user id
  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetch(`/api/users/${user_id}`, {
        method: "GET",
      });
      const userDataResponse = await userData.json();
      setPostUserDetails(userDataResponse);
    };
    fetchData().catch(console.error);
  }, []);
  if (!postUserDetails) return null;

  return (
    <>
      <DetailsWrapper>
        <ImageWrapper>
          <Image
            src={image_url}
            alt={name}
            height={280}
            width={450}
            priority
          ></Image>
          <WishedButton
            postID={_id}
            wishList={wishList}
            onToggleWished={onToggleWished}
          />
        </ImageWrapper>
        <DetailedInfo>
          <dt>Name: {name}</dt>
          <dt>Food Content :{content}</dt>
          <dt>Price: €{price}</dt>
          <dt>Available on:{date_of_availability}</dt>
          <dt>Posted on:{date_of_post}</dt>
          <dt>Location:{location}</dt>
          <dt>shipping Type:{shipping_type}</dt>
          <dt>Food Type:{tag}</dt>
          <dt>User Name:{postUserDetails.name}</dt>
          <PostReviews postId={_id} />
        </DetailedInfo>
      </DetailsWrapper>
    </>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const DetailsWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  flex-direction: column;
  gap: 5px;
`;

const DetailedInfo = styled.div`
  margin: 0 30px 50px 40px;
  font-weight: bold;
  color: black;
  padding: 40px;
`;
