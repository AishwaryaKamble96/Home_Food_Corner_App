import styled from "styled-components";
import Image from "next/image";
import { FcLikePlaceholder as LightRedHeart } from "react-icons/fc";
import { FcLike as RedHeart } from "react-icons/fc";
//import WishedButton from "../WishedButton";

export default function Post({ postData, wishList, onToggleWished }) {
  ///console.log("wishist from Post:", wishList);
  let isWished = false;

  function handleColor(id) {
    onToggleWished(id);

    isWished = wishList.filter((post, index) => {
      if (index.id == postData._id) return wishList.isWished;
    });
    console.log("ïswish", isWished);
    //  wishList.filter((post, index) => {
    //   if (index.id == postData._id) return wishList.isWished;
  }
  // if (wishList.length != 0) {
  //   isWished = wishList.filter((post, index) => {
  //     if (index.id == postData._id) return wishList.isWished;
  //   });
  // }

  return (
    <>
      <PostWrapper>
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
        {/* <WishedButton
          postID={postData._id}
          isWished={isWished}
          onToggleWished={onToggleWished}
        /> */}
        <HeartButton
          aria-label="favorite"
          onClick={() => {
            console.log(postData._id);
            handleColor(postData._id);
          }}
        >
          {isWished ? <RedHeart size={28} /> : <LightRedHeart size={28} />}
        </HeartButton>
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
`;
const HeartButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  position: relative;
  top: 10px;
  height: 10px;
`;

const InfoWrapper = styled.div``;
