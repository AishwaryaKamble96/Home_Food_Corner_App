import styled from "styled-components";
import { FcLikePlaceholder as LightRedHeart } from "react-icons/fc";
import { FcLike as RedHeart } from "react-icons/fc";

export default function WishedButton({ postID, onToggleWished, wishList }) {
  let isWished = false;
  // Get set isWished status variable for the respective post
  wishList.find((post) => {
    if (post.id == postID) isWished = post.isWished;
  });
  return (
    <HeartButton
      aria-label="favorite"
      onClick={() => {
        onToggleWished(postID);
      }}
    >
      {isWished ? <RedHeart size={28} /> : <LightRedHeart size={28} />}
    </HeartButton>
  );
}

const HeartButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  right: 0;
  height: 10px;
  transform: translate(-50%, -50%);
`;
