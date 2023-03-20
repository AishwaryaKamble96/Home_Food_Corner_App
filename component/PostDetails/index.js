import Image from "next/image";
import styled from "styled-components";

export default function PostDetails({ postDetails, onToggleWished }) {
  console.log("details:", postDetails);
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
  } = postDetails;
  //const { name, location, shipping_type, tag } = postDetails;
  //console.log("details2:", name, location, shipping_type, tag);
  return (
    <>
      <div>
        <Image
          src={image_url}
          alt={name}
          height={280}
          width={350}
          priority
        ></Image>
        <Details>
          <dt>Name: {name}</dt>
          <dt>Food Content :{content}</dt>
          <dt>Price: €{price}</dt>
          <dt>Available on:{date_of_availability}</dt>
          <dt>Posted on:{date_of_post}</dt>
          <dt>Loation:{location}</dt>
          <dt>shipping Type:{shipping_type}</dt>
          <dt>Food Type:{tag}</dt>
        </Details>
      </div>
    </>
  );
}

const Details = styled.section`
  margin: 0 30px 50px 40px;
  //margin-bottom: 40px;
  padding: 40px;
`;
