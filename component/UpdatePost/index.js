import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../Button/Button.styled";

export default function UpdatePost({ postId, isEditEnabled }) {
  // get today's date in ISO format YYYY-MM-DD and only 1st 10 char
  const postDate = new Date().toISOString().substring(0, 10);

  const [postDetails, setPostDetails] = useState();
  const [price, setPrice] = useState();
  //   const [price, setPrice] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetch(`/api/posts/${postId}`);
      const postDataResponse = await postData.json();
      setPostDetails(postDataResponse);
      setPrice(postDataResponse.price);
    };
    fetchData().catch(console.error);
  }, []);

  async function handleUpdate(event) {
    //     const post = new FormData(event.target);
    //     const postUpdatedData = Object.fromEntries(product);
    //     const response = await fetch(`/api/posts/${postId}`, {
    //       method: "PUT",
    //       body: JSON.stringify(postUpdatedData),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     if (response.ok) {
    //       await response.json();
    //     } else {
    //       console.error(`Error: ${response.status}`);
    //     }
  }
  // console.log(postDetails.name);
  if (postDetails) {
    //const { name, price, date_of_availability } = postDetails;
    //console.log(name, price, date_of_availability);
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
          />

          <StyledLabel htmlFor="price">Food Price €</StyledLabel>
          <StyledInput
            onChange={(event) => setPrice(event.target.price)}
            type="number"
            name="price"
            id="price"
            value={price}
            required
          />

          <StyledLabel htmlFor="date_of_availability">
            Availability Date
          </StyledLabel>
          <StyledInput
            type="date"
            name="date_of_availability"
            id="date_of_availability"
            value={postDetails.date_of_availability}
            min={postDate}
            required
          />
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
