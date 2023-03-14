export default function Post({ postData }) {
  return (
    <>
      <li key={postData._id}>
        <h3>{postData.name}</h3>
      </li>
    </>
  );
}
