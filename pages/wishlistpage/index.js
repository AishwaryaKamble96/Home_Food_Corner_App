import Post from "../../component/Post";
import styled from "styled-components";

export default function WishListPage({ postList, wishList, onToggleWished }) {
  //Filter list for post id whose isWished status is true
  const wishedPageList = postList.filter((post) => {
    return wishList.find((wishedpost) => {
      return wishedpost.id === post._id && wishedpost.isWished;
    });
  });

  return (
    <>
      <AppGrid>
        <PostList>
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
        </PostList>
      </AppGrid>
    </>
  );
}

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const AppGrid = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 80px;
`;
