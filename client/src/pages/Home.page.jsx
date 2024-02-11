import { useQuery, gql } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import { PostCard } from "../components";

const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      username
      body
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data?.getPosts;

  const user = null;

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {user && <Grid.Column>Post form</Grid.Column>}

        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts?.map(post => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
