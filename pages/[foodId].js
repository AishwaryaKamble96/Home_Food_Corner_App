import { useRouter } from "next/router";
import PostDetails from "../component/PostDetails";

// Below function is used to get details of specific post id
export default function FoodPostDetails({
  postList,
  onToggleWished,
  wishList,
}) {
  const router = useRouter();
  const foodPostId = router.query.foodId;
  //Get Post details by its Id
  const postDetails = postList.find((post) => post._id === foodPostId);
  if (!postDetails) return null;

  return (
    <PostDetails
      postDetails={postDetails}
      onToggleWished={onToggleWished}
      wishList={wishList}
    ></PostDetails>
  );
}
