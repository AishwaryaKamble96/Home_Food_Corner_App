import Image from "next/image";
import styled from "styled-components";
import WishedButton from "../WishedButton";

export default function PostDetails({ postDetails, onToggleWished, wishList }) {
  // destructure the postDetails object
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

  return (
    <>
      <DetailsWrapper>
        <ImageWrapper>
          <Image
            src={image_url}
            alt={name}
            height={280}
            width={450}
            priority
          ></Image>
          <WishedButton
            postID={_id}
            wishList={wishList}
            onToggleWished={onToggleWished}
          />
        </ImageWrapper>
        <DetailedInfo>
          <dt>Name: {name}</dt>
          <dt>Food Content :{content}</dt>
          <dt>Price: €{price}</dt>
          <dt>Available on:{date_of_availability}</dt>
          <dt>Posted on:{date_of_post}</dt>
          <dt>Loation:{location}</dt>
          <dt>shipping Type:{shipping_type}</dt>
          <dt>Food Type:{tag}</dt>
        </DetailedInfo>
      </DetailsWrapper>
    </>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const DetailsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  flex-direction: column;
`;

const DetailedInfo = styled.section`
  margin: 0 30px 50px 40px;
  color: rebeccapurple;
  padding: 40px;
`;
