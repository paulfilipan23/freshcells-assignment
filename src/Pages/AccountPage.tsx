// src/Pages/AccountPage.tsx
import { gql } from "@apollo/client";
import { Button, Divider, Paper, Stack, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { apolloClient } from "../apollo/client";
import { useAuth } from "../auth";

const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      firstName
      lastName
    }
  }
`;
const USER_ID = 2;

export default function AccountPage() {
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
  } | null>({
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(true);
  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await apolloClient.query({
          query: USER_QUERY,
          variables: { id: USER_ID },
          fetchPolicy: "no-cache",
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const u = data?.user;
        if (!u) throw new Error("User not found");
        setUserInfo({
          firstName: u.firstName ?? "",
          lastName: u.lastName ?? "",
        });
      } catch (err: Error | unknown) {
        notifications.show({
          color: "red",
          title: "Failed to load account",
          message: (err as Error)?.message || "Could not fetch user profile.",
        });

        // logout, token might be invalid
        handleLogout();
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed]);

  function handleLogout() {
    logout();
  }

  return (
    <div>
      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Stack gap="lg">
          <Title order={2}>Account</Title>
          <Divider />
          <TextInput
            label="First name"
            value={userInfo?.firstName || ""}
            readOnly
            rightSection={loading ? "…" : undefined}
          />
          <TextInput
            label="Last name"
            value={userInfo?.lastName || ""}
            readOnly
            rightSection={loading ? "…" : undefined}
          />
          <Divider />
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
