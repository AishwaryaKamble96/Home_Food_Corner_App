import { useState } from "react";
import styled from "styled-components";

export default function UserDetails({
  userData,
  addUserDetails,
  setUserDetails,
}) {
  const [contactno, setContactno] = useState(userData.contactno);
  const [location, setLocation] = useState(userData.location);

  const id = userData._id;
  async function handleUpdate(event) {
    event.preventDefault();
    const form = event.target.elements;
    const contactno = form.contactno.value;
    const location = form.location.value;

    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        location: location,
        contactno: contactno,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
      handleUserDetailsRender();
    } else {
      console.error(`Error: ${response.status}`);
    }
    addUserDetails(false);
  }

  async function handleUserDetailsRender() {
    const data = await fetch(`/api/users/${id}`);
    const userData = await data.json();
    setUserDetails(userData);
  }

  return (
    <>
      <StyledForm onSubmit={handleUpdate}>
        <StyledLabel htmlFor="contactno">Contact No:</StyledLabel>
        <StyledInput
          onChange={(event) => setContactno(event.target.contactno)}
          type="text"
          name="contactno"
          id="contactno"
          value={contactno}
          required
        />
        <StyledLabel htmlFor="location">Location:</StyledLabel>
        <StyledInput
          onChange={(event) => setLocation(event.target.location)}
          type="text"
          name="location"
          id="location"
          value={location}
          required
        />
        <button>Submit</button>
      </StyledForm>
    </>
  );
}
const StyledForm = styled.form`
  margin: 5px 5px 5px 15px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  border: 1px solid;
`;
const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const StyledInput = styled.input`
  width: 70%;
`;
