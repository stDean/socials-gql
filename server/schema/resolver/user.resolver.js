import User from "../../../server/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../../server/utils/validator.js";

function generateJWT(data) {
  return jwt.sign(
    {
      id: data.id,
      email: data.email,
      username: data.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

export const userResolver = {
  Query: {},
  Mutation: {
    registerUser: async (_, args, context) => {
      let { username, email, password, confirmPassword } = args.registerInput;

      const { errors, valid } = validateRegisterInput({
        username,
        email,
        password,
        confirmPassword,
      });

      if (!valid) {
        throw new GraphQLError("Errors", {
          extensions: {
            code: "BAD_USER_INPUT",
            errors,
          },
        });
      }

      const user = await User.findOne({ email });
      if (user) {
        throw new GraphQLError("User Already Exists", {
          extensions: {
            code: "BAD_USER_INPUT",
            argumentName: "email",
          },
        });
      }

      password = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateJWT(res);

      return { ...res._doc, id: res.id, token };
    },

    loginUser: async (_, args) => {
      const { email, password } = args.loginInput;

      const { valid, errors } = validateLoginInput({ email, password });
      if (!valid) {
        throw new GraphQLError("Errors", {
          extensions: {
            code: "BAD_USER_INPUT",
            errors,
          },
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            argumentName: "email",
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new GraphQLError("password don't match", {
          extensions: {
            code: "BAD_USER_INPUT",
            argumentName: "password",
          },
        });
      }

      const token = generateJWT(user);

      return { ...user._doc, id: user.id, token };
    },
  },
};
