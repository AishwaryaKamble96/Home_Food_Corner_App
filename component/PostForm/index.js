import styled from "styled-components";
import { StyledButton } from "../Button/Button.styled";

export default function PostForm({ userId, location, addPostEnabled }) {
  // get today's date in ISO format YYYY-MM-DD and only 1st 10 char
  const postDate = new Date().toISOString().substring(0, 10);

  async function handleSubmit(event) {
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);

    // add form data and useri in new object
    const newPostData = {
      ...formData,
      user_id: userId,
    };

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostData),
    });

    //On resonse ok=> reset the form fields an set addPostEnabled to show profile component
    if (response.ok) {
      await response.json();
      event.target.reset();
      addPostEnabled(false);
    } else {
      console.error(response.status);
    }
  }

  function handleBackButton() {
    addPostEnabled(false);
  }

  return (
    <>
      <button onClick={handleBackButton}>Back to Profile</button>
      <StyledHeading>Add New Post</StyledHeading>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="name">Post Food Name</StyledLabel>
        <StyledInput type="text" name="name" id="name" required />
        <StyledLabel htmlFor="price">Food Price €</StyledLabel>
        <StyledInput type="number" name="price" id="price" required />
        <StyledLabel htmlFor="content">Food contents</StyledLabel>
        <textarea
          name="content"
          id="content"
          rows={2}
          cols={30}
          required
        ></textarea>
        <StyledLabel htmlFor="date_of_availability">
          Availability Date
        </StyledLabel>
        <StyledInput
          type="date"
          name="date_of_availability"
          id="date_of_availability"
          min={postDate}
        />
        <StyledLabel htmlFor="date_of_post">Post Date</StyledLabel>
        <StyledInput
          type="text"
          name="date_of_post"
          id="date_of_post"
          value={postDate}
          readonly
        />
        <StyledLabel htmlFor="image_url">Select Food Image</StyledLabel>
        <StyledInput type="text" name="image_url" id="image_url" required />
        <StyledLabel htmlFor="location">Location</StyledLabel>
        <StyledInput
          type="text"
          name="location"
          id="location"
          value={location}
          readOnly
        />
        <StyledLabel htmlFor="shipping_type">Delivery Type</StyledLabel>
        <select name="shipping_type" id="shipping_type" required>
          <option value="select">Select available service</option>
          <option value="homepickup">Home Pickup</option>

          <option value="doorstep">Door Step delivery</option>
        </select>
        <StyledLabel htmlFor="tag">Food Tag</StyledLabel>
        <select name="tag" id="tag" required>
          <option value="select">Select</option>
          <option value="vegan">Vegan</option>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>

        <StyledButton>Submit</StyledButton>
      </StyledForm>
    </>
  );
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
