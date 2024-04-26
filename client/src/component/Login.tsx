import Button from "./Button.tsx";
import { useMutation } from "@apollo/client";
import { Login_Mutation } from "../graphql/mutation/LoginMutation.ts";
import { useState } from "react";
// import { jwtDecode } from "jwt-decode";

export default function Login() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [login, { loading, error }]: any = useMutation(Login_Mutation);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p> Loading...</p>;

  function handleOnClick() {
    // alert(`username: ${username}
    // password: ${password}`);
    const { data } = login({
      variables: {
        username: username,
        password: password,
      },
    });

    console.log("data", data);
    // localStorage.setItem("token", data.login);
    // const decode = jwtDecode(data.login);
    // console.log(decode);
  }

  return (
    <div className="flex justify-center pt-6">
      <div className="border flex w-[500px] justify-center rounded-md gap-2 flex-col p-4">
        <label>
          {" "}
          Username{" "}
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="border p-1 rounded-md"
            placeholder="username"
          />
        </label>
        <label>
          {" "}
          Password{" "}
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border p-1 rounded-md"
            placeholder="password"
          />
        </label>
        <Button onClick={handleOnClick}>Login</Button>
      </div>
    </div>
  );
}
