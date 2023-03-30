import styled from "styled-components";
import Image from "next/image";
import WishedButton from "../WishedButton";
import { useRouter } from "next/router";

// Below function will use to display each content
export default function Post({ postData, wishList, onToggleWished }) {
  const router = useRouter();

  //Route to the respective post details by food name

  function handleDetailsClick() {
    const foodId = postData._id;
    const detailsPageUrl = `/${foodId}`;
    router.push(detailsPageUrl);
  }

  return (
    <>
      <PostWrapper>
        <ImageWrapper>
          <Image
            onClick={handleDetailsClick}
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
          <DetailsButton onClick={handleDetailsClick}>
            More details..
          </DetailsButton>
        </InfoWrapper>
        <WishedButton
          postID={postData._id}
          wishList={wishList}
          onToggleWished={onToggleWished}
        />
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
  padding: 20px;
  background-color: rgb(251, 252, 252);
  position: relative;
  width: 100%;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const HeartButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  position: relative;
  top: 10px;
  height: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const InfoWrapper = styled.div``;
const DetailsButton = styled.button`
  position: relative;
  top: 30px;
  height: 30px;
  padding: 5px;
  background-color: #f5ecdb;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
