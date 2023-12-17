import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { User } from "../util/validation";
import { Box, Button, Typography } from "@mui/material";
import "tailwindcss/tailwind.css";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/user/actions";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: null, password: null });
  const navigate = useNavigate();

  const dispatch = useDispatch();


  function handleLogin() {

    try {
      User.parse({
        email,
        password,
      });
      setErrors({ email: null, password: null });

      dispatch(getUser({email, password})).then(
        () => navigate(`/home/about/`),
        () =>  setErrors({ email: { message: "Invalid user" }, password: null }))
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors({
          email: err.errors.find((error) => error.path[0] === "email") || null,
          password:
            err.errors.find((error) => error.path[0] === "password") || null,
        });
      }
    }
  }

  return (
    <Box className="flex flex-col items-center">
      <Box className="w-8/12 mb-4 flex items-center justify-between mt-10">
        <Button component={NavLink} to="/" variant="contained">
          <Typography className="pt-1 pb-1" variant="h8">
            To choice
          </Typography>
        </Button>
        <Typography className="pr-16" variant="h3">
          Login
        </Typography>
        <Box></Box>
      </Box>
      <Box className="w-full flex flex-col items-center justify-between">
        <Box className="flex flex-col items-center justify-center w-8/12 h-1/4  mb-12">
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-black border-2 p-4 bg-slate-500 h-12 w-full"
          />
          {errors.email && (
            <Box className="text-red-400 absolute top-44">
              <Typography variant="h5">{errors.email.message}</Typography>
            </Box>
          )}
        </Box>
        <Box className="flex flex-col items-center justify-center w-8/12 h-1/4  mb-2">
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-black border-2 p-4 bg-slate-500 mt-4  h-12 w-full"
          />
          {errors.password && (
            <Box className="text-red-400 absolute top-72">
              <Typography variant="h5">{errors.password.message}</Typography>
            </Box>
          )}
        </Box>

        <Box className="mt-24">
          <Button variant="contained" onClick={handleLogin} className="mt-4">
            <Typography className="pl-32 pr-32 pt-4 pb-4" variant="h4">
              Login
            </Typography>
          </Button>
          {errors.invalidUser && (
            <Box className="text-red-400">
              <Typography variant="h5">{errors.invalidUser}</Typography>
            </Box>
          )}
          <Typography className="flex pl-10 pt-10 justify-center">
            <NavLink
              to="/sign/"
              end={true}
              className=" pr-10  text-green-500 font-semibold text-lg transition duration-300 hover:text-green-700"
            >
              Create account
            </NavLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
