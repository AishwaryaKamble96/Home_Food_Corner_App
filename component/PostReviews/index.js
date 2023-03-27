import { useSession } from "next-auth/react";
export default function PostReviews({ postId }) {
  const { data: session } = useSession();

  const reviewId = session.user.id;

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
        ></input>
        <button>Add</button>
      </form>
      <ul>
        <li></li>
      </ul>
    </>
  );
}
