import React, { useState } from "react";
import {
  Container,
  Content,
  Form,
  ButtonToolbar,
  Button, Schema,
  Panel, Footer,
  FlexboxGrid,
} from "rsuite";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import useApi from "../../app/useApi";
import { useTheme } from "../../Context/TheamProvider";
// Elements
import logo from "../../assets/img/logo.svg"
import haxeriB from "../../assets/img/haxeriB.svg"
import haxeriL from "../../assets/img/haxeriL.svg"



const { StringType } = Schema.Types;
const model = Schema.Model({
  username: StringType().isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.')
});

const TextField = (props: any) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control errorMessage={props.errorMessage} name={name} accepter={accepter} {...rest} />
      {props.tooltip ? <Form.HelpText tooltip>{props.tooltip}</Form.HelpText> : <></>}
    </Form.Group>
  );
}


export default function LoginUI() {
  const [username, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorClass, setErrorClass] = useState<string>();

  const auth = useAuth();
  const { theme } = useTheme();
  const api = new useApi(auth);

  const handleSubmit = (checkStatus: boolean, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username + password)

    const networkRequest = async () => {

      try {
        const res: any = await api.useLogin({ username, password });
        console.log("response", res.status)
        if (res.status === 500) {
          setErrorClass(res.response)
        } else {
          const { token, refreshToken } = res.response;
          auth.login({ token: token, refreshToken: refreshToken });
        }
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
                    <img
                      src={logo}
                      alt="Logo"
                      width="50"
                      height="40"
                      style={{ marginRight: "20px" }}
                    />
                    Login
                  </h3>
                }
                bordered
              >
                <Form onSubmit={handleSubmit} model={model}>
                  <TextField name="name" label="Username" value={username} tooltip="Use your agent banking user id" autoComplete="on" onChange={handleUsernameChange} />

                  <TextField name="password" label="password" errorMessage={errorClass} type="password" value={password} onChange={handlePasswordChange} />

                  <Form.Group>
                    <ButtonToolbar>
                      <Button appearance="primary" type="submit">
                        Sign in
                      </Button>
                      {/* <Button appearance="link">Forgot password?</Button> */}
                    </ButtonToolbar>
                  </Form.Group>
                </Form>

                <Footer>
                  <Panel>
                    <FlexboxGrid
                      justify={'center'}
                      align={'middle'}
                    >
                      <p style={{ marginRight: 5 }}>Power by</p>
                      {theme != "light" ? <img src={haxeriL} height={20} /> : <img src={haxeriB} height={20} />}

                      <a style={{ marginLeft: 5 }} href="http://www.haxeri.com/">haxeri.com</a>
                    </FlexboxGrid>
                  </Panel>
                </Footer>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container >
    </div >
  );
}
