import React, { useState } from "react";
import {
  Container,
  Content,
  Form,
  ButtonToolbar,
  Button,
  Panel,
  FlexboxGrid,
} from "rsuite";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import useApi from "../../app/useApi";
// Elements
// import logo from "../../assets/img/logo.svg"

export default function LoginUI() {
  const [username, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorClass, setErrorClass] = useState<string>("");

  const auth = useAuth();
  const api = new useApi(auth);


  const handleSubmit = (checkStatus: boolean, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const networkRequest = async () => {

      try {
        const res = await api.useLogin({ username, password });
        const { token, refreshToken } = res.response;
        auth.login({ token: token, refreshToken: refreshToken });

      } catch (err: any) {
        if (err.response && err.response.status === 500) {
          toast.error(err.response.data.toString());
          setErrorClass("has-error");
        } else {
          console.log(err);
          toast.error("Something went wrong. Please try again later.");
        }
      }
    };
    networkRequest();
  };

  const handleUsernameChange = (value: string) => setUser(value);
  const handlePasswordChange = (value: string) => setPassword(value);

  return (
    <div
      className="show-fake-browser login-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Container>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <Panel
                header={
                  <h3>
                    {/* <img
                      src={logo}
                      alt="Logo"
                      width="50"
                      height="50"
                      style={{ marginRight: "15px" }}
                    /> */}
                    Login
                  </h3>
                }
                bordered
              >
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.ControlLabel>
                      Username
                    </Form.ControlLabel>
                    <Form.Control
                      name="name"
                      autoComplete="on"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="on"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button appearance="primary" type="submit">
                        Sign in
                      </Button>
                      {/* <Button appearance="link">Forgot password?</Button> */}
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
}
