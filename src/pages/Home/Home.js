//components
import Post from "../../components/Post/Post";
import Wrapper from "../../components/Wrapper/Wrapper";
//custom hooks
import { usePostsContext } from "../../hooks/usePostsContext";
//react-router-dom
import { Link } from "react-router-dom";
//react
import { useEffect } from "react";
//styles
import styles from "./Home.module.scss";
//fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Home = ({ URL }) => {
  const { posts, dispatch } = usePostsContext();

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`${URL}posts/`);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: data });
      }
    };

    getPosts();
  }, [dispatch, URL]);

  return (
    <Wrapper>
      <div className={styles.banner}>
        <h1>Top Questions</h1>
        <Link to="/new" className={styles.link}>
          <div className={styles.button}>Ask a Question</div>
        </Link>
      </div>
      {posts &&
        posts.map((post) => (
          <Post key={post._id}>
            <p>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
            <Link to={`/post/${post._id}`} className={styles.link}>
              <div className={styles.title}>{post.title}</div>
            </Link>
          </Post>
        ))}
    </Wrapper>
  );
};

export default Home;
