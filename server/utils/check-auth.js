import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const checkAuth = ({ context }) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Invalid Authorization");
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    throw new GraphQLError("Invalid Authentication.", {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }
};
