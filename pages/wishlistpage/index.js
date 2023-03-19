import Post from "../../component/Post";

export default function WishListPage({ postList, wishList, onToggleWished }) {
  //Filter list for post id whose isWished status is true
  const wishedPageList = postList.filter((post) => {
    return wishList.find((wishedpost) => {
      return wishedpost.id === post._id && wishedpost.isWished;
    });
  });

  return (
    <>
      <ul>
        {wishedPageList.map((post) => {
          return (
            <Post
              postData={post}
              key={post._id}
              wishList={wishList}
              onToggleWished={onToggleWished}
            ></Post>
          );
        })}
      </ul>
    </>
  );
}
