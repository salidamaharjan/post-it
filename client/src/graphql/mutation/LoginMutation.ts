import { gql } from "@apollo/client";

export const Login_Mutation = gql`
  mutation login(
    $username: String, 
    $password: String
    ) {
    login(
      username: $username, 
      password: $password
      )
  }
  # mutation Mutation($username: String, $password: String) {
  #   login(username: $username, password: $password)
  # }
`; 

