import { useParams, Link } from "react-router-dom";

const RenderSingleUser = ({ users }) => {
  const id = useParams().id;
  const user = users.find((us) => us.id === id);
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderSingleUser;
