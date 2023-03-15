import styled from "styled-components";
import Image from "next/image";

export default function Post({ postData }) {
  return (
    <>
      <PostWrapper key={postData._id}>
        <ImageWrapper>
          <Image
            src={postData.image_url}
            alt={postData.name}
            width={170}
            height={200}
            priority
          ></Image>
        </ImageWrapper>
        <InfoWrapper>
          <h3>{postData.name}</h3>
          <dd>Price:€ {postData.price} </dd>
          <dd>Tag: {postData.tag} </dd>
          <dd>Available on :{postData.date_of_availability}</dd>
          <dd>Location: {postData.location} </dd>
        </InfoWrapper>
      </PostWrapper>
    </>
  );
}

const ImageWrapper = styled.div`
  border-radius: 50%;
`;
const PostWrapper = styled.li`
  margin: 0 10px 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /* border-radius: 7px; */
  padding: 20px;
  background-color: rgb(251, 252, 252);
  /* box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px; */
  position: relative;
  width: 100%;
`;

const InfoWrapper = styled.div``;