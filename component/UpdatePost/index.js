import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../Button/Button.styled";

export default function UpdatePost({ postId, isEditEnabled }) {
  // get today's date in ISO format YYYY-MM-DD and only 1st 10 char
  const postDate = new Date().toISOString().substring(0, 10);

  const [postDetails, setPostDetails] = useState();
  const [price, setPrice] = useState();
  const [availableDate, setAvailableDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetch(`/api/posts/${postId}`);
      const postDataResponse = await postData.json();
      setPostDetails(postDataResponse);
      setPrice(postDataResponse.price);
      setAvailableDate(postDataResponse.date_of_availability);
    };
    fetchData().catch(console.error);
  }, []);

  async function handleUpdate(event) {
    event.preventDefault();
    const post = new FormData(event.target);
    const postUpdatedData = Object.fromEntries(post);
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify(postUpdatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
      alert("Successfully post details are updated");
    } else {
      alert(
        "Error: Unable to update post details at this time. Please try again later."
      );
      console.error(`Error: ${response.status}`);
    }
    isEditEnabled(false);
  }

  if (postDetails) {
    return (
      <>
        <StyledHeading>Add New Post</StyledHeading>
        <StyledForm onSubmit={handleUpdate}>
          <StyledLabel htmlFor="name">Post Food Name</StyledLabel>
          <StyledInput
            type="text"
            name="name"
            id="name"
            value={postDetails.name}
            required
            readOnly
          />

          <StyledLabel htmlFor="price">Food Price €</StyledLabel>
          <StyledInput
            onChange={(event) => setPrice(event.target.price)}
            type="number"
            name="price"
            id="price"
            value={price}
            required
            autoFocus
          />

          <StyledLabel htmlFor="date_of_availability">
            Availability Date
          </StyledLabel>
          <StyledInput
            onChange={(event) =>
              setAvailableDate(event.target.date_of_availability)
            }
            type="date"
            name="date_of_availability"
            id="date_of_availability"
            value={availableDate}
            min={postDate}
            required
          />
          <button>Update</button>
        </StyledForm>
      </>
    );
  }
}

const StyledForm = styled.form`
  margin: 30px 30px 100px 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const StyledInput = styled.input`
  width: 70%;
`;
const StyledHeading = styled.h2`
  text-align: center;
  color: var(--color-nemo);
`;
