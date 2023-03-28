import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import WishedButton from "../WishedButton";
import PostReviews from "../PostReviews";

export default function PostDetails({ postDetails, onToggleWished, wishList }) {
  const [postUserDetails, setPostUserDetails] = useState({});
  const [reviewsList, setReviewsList] = useState([]);
  //const [postReviewList, setPostReviewList] = useState([]);
  let postReviewList = [];
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

  // Get reviews based on post Id if any

  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await fetch("/api/reviews", {
        method: "GET",
      });
      const reviewsDataResponse = await reviewsData.json();
      console.log("called");
      setReviewsList(reviewsDataResponse);
    };
    fetchData().catch(console.error);
  }, []);
  if (reviewsList) {
    postReviewList = reviewsList.filter((review) => review.postId === _id);
  } else {
    return null;
  }
  console.log("reviews", postReviewList);
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
          <PostReviews postId={_id} setReviewsList={setReviewsList} />
        </DetailedInfo>

        <ReviewSection>
          <ul>
            {postReviewList.map((review) => {
              return (
                <ReviewStyled key={review._id}>{review.review}</ReviewStyled>
              );
            })}
          </ul>
        </ReviewSection>
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
  margin: 0 30px 80px 40px;
  padding: 10px;
  flex-direction: column;
  gap: 5px;
`;

const DetailedInfo = styled.div`
  margin: 0 30px 20px 40px;
  font-weight: bold;
  color: black;
  padding: 20px;
`;
const ReviewSection = styled.div`
  margin: 10px;
  padding: 5px;
  display: flex;
  gap: 5px;
`;

const ReviewStyled = styled.li`
  list-style: none;
  padding: 5px;
  background-color: whitesmoke;
  border-radius: 25%;
  border-color: black;
`;
