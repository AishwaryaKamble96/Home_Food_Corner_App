import styled from "styled-components";
import { StyledButton } from "../Button/Button.styled";
import { useState } from "react";

export default function PostForm({
  userId,
  location,
  addPostEnabled,
  handleRender,
}) {
  // get today's date in ISO format YYYY-MM-DD and only 1st 10 char
  const postDate = new Date().toISOString().substring(0, 10);

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const form = new FormData(event.target);
      const formData = Object.fromEntries(form);
      const fileInput = Array.from(event.target.elements).find(
        ({ name }) => name === "file"
      );
      const imageFormData = new FormData();

      for (const file of fileInput.files) {
        imageFormData.append("file", file);
      }

      imageFormData.append("upload_preset", "aartyakp");

      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dpd1hde6k/image/upload",
        {
          method: "POST",
          body: imageFormData,
        }
      ).then((r) => r.json());

      const newPostData = {
        ...formData,
        image_url: data.url,
        user_id: userId,
      };

      const response = await fetch("/api/posts/", {
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
        setImageSrc(data.secure_url);
        setUploadData(data);
        handleRender();
        alert("Successfully post is created");
      } else {
        console.error(response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Error: Unable to create new post at this time. Please try again later."
      );
    }
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  function handleBackButton() {
    addPostEnabled(false);
  }

  return (
    <>
      <BackButton onClick={handleBackButton}>Back to Profile</BackButton>
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

        {/* // Image upload section */}

        <StyledLabel htmlFor="image_url">Select Food Image</StyledLabel>
        <input type="file" name="file" onChange={handleOnChange} required />
        <img src={imageSrc} width={180} height={150} />

        <StyledLabel htmlFor="location">Location</StyledLabel>
        <StyledInput
          type="text"
          name="location"
          id="location"
          value={location}
          readOnly
          required
        />
        <StyledLabel htmlFor="shipping_type">Delivery Type</StyledLabel>
        <select name="shipping_type" id="shipping_type" required>
          <option value="">Select available service</option>
          <option value="homepickup">Home Pickup</option>
          <option value="doorstep">Door Step delivery</option>
        </select>
        <StyledLabel htmlFor="tag">Food Tag</StyledLabel>
        <select name="tag" id="tag" required>
          <option value="">Select</option>
          <option value="Vegan">Vegan</option>
          <option value="Veg">Veg</option>
          <option value="Nonveg">Non-Veg</option>
        </select>

        <StyledButton>Submit</StyledButton>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  margin: 30px 30px 100px 30px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  backdrop-filter: blur(6px);
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

const BackButton = styled.button`
  background-color: #f9e79f;
  padding: 10px;
  border-radius: 5%;
  width: 150px;
  border: 1px solid;
  position: relative;
  left: 5%;
  transform: translateY(45px);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
