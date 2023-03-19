import styled from "styled-components";
import { FcLikePlaceholder as LightRedHeart } from "react-icons/fc";
import { FcLike as RedHeart } from "react-icons/fc";

export default function WishedButton({ postID, onToggleWished, isWished }) {
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
  position: relative;
  top: 10px;
  height: 10px;
`;
