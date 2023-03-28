import { useSession } from "next-auth/react";
export default function PostReviews({ postId, setReviewsList }) {
  const { data: session } = useSession();

  const reviewId = session.user.id;

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
      userId: reviewId,
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviewText"></label>
        <input
          type="text"
          name="reviewText"
          id="reviewText"
          placeholder="Add review"
          size={50}
          required
        ></input>
        <button>Add</button>
      </form>
    </>
  );
}
