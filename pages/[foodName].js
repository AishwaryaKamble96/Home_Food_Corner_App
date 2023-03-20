import { useRouter } from "next/router";
import PostDetails from "./../component/PostDetails";

export default function FoodPostDetails({ postList, onToggleWished }) {
  const router = useRouter();
  const foodPostName = router.query.foodName;

  const postDetails = postList.find((post) => post.name === foodPostName);
  //const { name, location, shipping_type, tag } = postDetails;
  //console.log(postDetails.name, onToggleWished);
  //   const {
  //     id,
  //     name,
  //     image_url,
  //     content,
  //     price,
  //     date_of_availability,
  //     date_of_post,
  //     location,
  //     shipping_type,
  //     tag,
  //   } = postDetails;
  //   console.log(name, image_url, content, price);
  //console.log(postDetails.name);
  return (
    <PostDetails
      postDetails={postDetails}
      onToggleWished={onToggleWished}
    ></PostDetails>
  );
}
