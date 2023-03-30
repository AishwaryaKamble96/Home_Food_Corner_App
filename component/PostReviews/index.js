import { useSession } from "next-auth/react";
import styled from "styled-components";
export default function PostReviews({ postId, setReviewsList }) {
  const reviewDate = new Date().toISOString().substring(0, 10);
  const { data: session } = useSession();
  const reviewerId = session.user.id;

  async function handleReviewRender() {
    const data = await fetch("/api/reviews");
    const dataReponse = await data.json();
    setReviewsList(dataReponse);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const reviewText = event.target.reviewText.value;

    const newReview = {
      review: reviewText,
      postId: postId,
      userId: reviewerId,
      reviewDate: reviewDate,
    };

    const response = await fetch("/api/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });

    if (response.ok) {
      await response.json();
      handleReviewRender();
      event.target.reset();
    } else {
      console.error(response.status);
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="reviewText"></label>
        <input
          type="text"
          name="reviewText"
          id="reviewText"
          placeholder="Add review"
          size={50}
          required
        ></input>
        <AddButton>Add</AddButton>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 5px;
  flex-direction: row;
`;

const AddButton = styled.button`
  padding: 5px;
  background-color: #f5ecdb;
`;
