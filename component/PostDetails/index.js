import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import WishedButton from "../WishedButton";
import PostReviews from "../PostReviews";
import { useSession } from "next-auth/react";
export default function PostDetails({ postDetails, onToggleWished, wishList }) {
  const [postUserDetails, setPostUserDetails] = useState({});
  const [reviewsList, setReviewsList] = useState([]);

  let postReviewList = [];

  const { data: session } = useSession();

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

      setReviewsList(reviewsDataResponse);
    };
    fetchData().catch(console.error);
  }, []);
  if (reviewsList) {
    postReviewList = reviewsList.filter((review) => review.postId === _id);
  } else {
    return null;
  }

  return (
    <>
      <DetailsWrapper>
        <ImageWrapper>
          <Image
            src={image_url}
            alt={name}
            //height={280}
            width
            style={{ height: "50%", width: "80%" }}
            priority
          ></Image>
          <WishedButton
            postID={_id}
            wishList={wishList}
            onToggleWished={onToggleWished}
          />
        </ImageWrapper>
        <DetailedInfo>
          <p>
            Name
            <br />
            <Value> {name}</Value>
          </p>
          <p>
            Food Content
            <br />
            <Value> {content}</Value>
          </p>
          <p>
            Price
            <br />
            <Value> €{price}</Value>
          </p>
          <p>
            Available on <br />
            <Value>{date_of_availability}</Value>
          </p>
          <p>
            Posted on
            <br />
            <Value> {date_of_post}</Value>
          </p>
          <p>
            Location <br />
            <Value> {location}</Value>
          </p>
          <p>
            Shipping Type <br />
            <Value> {shipping_type}</Value>
          </p>
          <p>
            Food Type <br />
            <Value> {tag}</Value>
          </p>
          <p>
            User Name <br />
            <Value> {postUserDetails.name}</Value>
          </p>
          <p>
            User Contact No <br />
            <Value>{postUserDetails.contactno}</Value>
          </p>
        </DetailedInfo>

        <ReviewSection>
          {session != null ? (
            <PostReviews postId={_id} setReviewsList={setReviewsList} />
          ) : (
            <Note>To add review,Please Login!</Note>
          )}
        </ReviewSection>
        <ReviewListWrapper>
          <p>Customer Reviews</p>
          {postReviewList.map((review) => {
            return (
              <ReviewStyled key={review._id}>
                <div>{review.review}</div>
                <div>{review.reviewDate}</div>
              </ReviewStyled>
            );
          })}
        </ReviewListWrapper>
      </DetailsWrapper>
    </>
  );
}

const ImageWrapper = styled.div`
  position: relative;
  border-style: ridge;
  display: flex;
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
  padding: 10px;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
`;

const Value = styled.span`
  font-size: 25px;
`;
const ReviewSection = styled.div`
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: row;
`;

const ReviewListWrapper = styled.ul`
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: white;
  font-size: large;
`;

const ReviewStyled = styled.li`
  list-style: none;
  color: black;
  font-size: large;
  border-radius: 5px;
  background-color: whitesmoke;
  padding: 3px;
  display: flex;
  justify-content: space-evenly;
`;
const Note = styled.div`
  font-size: small;
  border: 1px black;
  background-color: whitesmoke;
  margin: 10px;
  padding: 10px;
`;
