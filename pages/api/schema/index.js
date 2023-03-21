import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    occupation: String
    password: String
  }

  type Profile {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    about: String
    photo: String
    address: String
    github: String
    linkedin: String
    phone: String
    skills: [String]
    projects: [Project]
  }

  type Project {
    id: ID!
    githuburl: String
    youtubeurl: String
    projectname: String
    projectdescription: String
  }

  type Query {
    hello: String!
  }

  type Mutation {
    signup(data: signUpInput!): UserAuthPayload!
    signin(data: signInInput!): UserAuthPayload!
    createProfile(data: createProfileInput!): Profile!
    createProject(data: createProjectInput!, profileId: ID!): Project!
  }

  type UserAuthPayload {
    user: User!
    token: String!
  }

  input signUpInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    occupation: String
  }

  input signInInput {
    email: String!
    password: String!
  }

  input createProfileInput {
    firstname: String!
    lastname: String!
    email: String!
    about: String!
    photo: String!
    address: String!
    github: String!
    linkedin: String!
    phone: String!
    skills: String!
  }

  input createProjectInput {
    githuburl: String
    youtubeurl: String
    projectname: String!
    projectdescription: String!
  }
`;
