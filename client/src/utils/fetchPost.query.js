import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
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