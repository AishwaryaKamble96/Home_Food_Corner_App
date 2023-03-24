import styled from "styled-components";

export default function UserDetails({ userData, addUserDetails }) {
  async function handleUpdate(event) {
    const id = userData._id;
    event.preventDefault();
    const form = event.target.elements;
    const contactno = form.contactno.value;
    const location = form.location.value;
    console.log("data user", contactno, location);
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
    } else {
      console.error(`Error: ${response.status}`);
    }
    addUserDetails(false);
  }

  return (
    <>
      <StyledForm onSubmit={handleUpdate}>
        <StyledLabel htmlFor="contactno">Contact No:</StyledLabel>
        <StyledInput
          type="text"
          name="contactno"
          id="contactno"
          value={userData.contactno}
          required
        />
        <StyledLabel htmlFor="location">Location:</StyledLabel>
        <StyledInput
          type="text"
          name="location"
          id="location"
          value={userData.location}
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
