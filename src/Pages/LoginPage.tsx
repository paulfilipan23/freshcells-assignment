// src/Pages/LoginPage.tsx
import { gql } from "@apollo/client";
import {
  Button,
  Divider,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { apolloClient } from "../apollo/client";
import { useAuth } from "../auth";

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { identifier: email, password },
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const token = data?.login?.jwt;
      if (!token) throw new Error("No JWT returned");

      // update context
      login(token);

      notifications.show({
        color: "green",
        title: "Success",
        message: "Logged in successfully.",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notifications.show({
        color: "red",
        title: "Login failed",
        message: err?.message || "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        style={{
          width: "100%",
          maxWidth: 400,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Stack gap="lg">
          <div style={{ textAlign: "center" }}>
            <Title
              order={1}
              size="h2"
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Welcome Back
            </Title>
            <Text c="dimmed" size="sm">
              Sign in to your account to continue
            </Text>
          </div>

          <Divider />

          <Stack gap="md">
            <TextInput
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            <Button
              fullWidth
              onClick={handleLogin}
              loading={loading}
              style={{ background: "linear-gradient(45deg, #667eea, #764ba2)" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Stack>

          <Divider />
        </Stack>
      </Paper>
    </div>
  );
}
