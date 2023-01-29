import React, {useEffect} from 'react';
import {Col, Divider, Row} from 'antd';
import {GOOGLE_APP_CLIENT_ID} from "../constants";
import jwt_decode from "jwt-decode";

export default function LoginPage({onLogin}) {
    const onSuccess = (res) => {
        let userInfo = jwt_decode(res.credential);
        console.log('Login Success: currentUser:', userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        onLogin(userInfo);
    };

    // https://developers.google.com/identity/gsi/web/reference/js-reference

    useEffect(() => {
        /* global google */
        if (window["google"]) {
            // @ts-ignore
            google.accounts.id.initialize({
                client_id: GOOGLE_APP_CLIENT_ID,
                callback: onSuccess,
            });

            // @ts-ignore
            google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
                theme: "filled_blue",
                text: "signin_with",
                shape: "pill",
                className: "g_id_signin",
                size: "large",
                logo_alignment: "left",
                width: "500"
            });
        }
    }, [onSuccess]);


    // @ts-ignore
    return <>
        <Row>
            <Col span={8}></Col>
            <Col span={4}>
                <div>
                    <Divider orientation="right">Welcome</Divider>
                    {/*<GoogleLogin
                        clientId={GOOGLE_APP_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                    />*/}

                    {/*<div id="g_id_onload"
                         data-client_id={GOOGLE_APP_CLIENT_ID}
                         data-context="signin"
                         data-ux_mode="popup"
                         data-callback={(res)=>onSuccess(res)}
                         data-auto_prompt="false">
                    </div>

                    <div className="g_id_signin"
                         data-type="standard"
                         data-shape="pill"
                         data-theme="filled_blue"
                         data-text="signin_with"
                         data-size="large"
                         data-logo_alignment="left"
                         data-width="500">
                    </div>*/}
                    {/*<Helmet>
                        <script>
                            function handleCredentialResponse(response) {
                            console.log("Encoded JWT ID token: " + response.credential);
                        }
                            window.onload = function () {
                            google.accounts.id.initialize({
                                client_id: {GOOGLE_APP_CLIENT_ID},
                                callback: onSuccess
                            });
                            google.accounts.id.renderButton(
                            document.getElementById("buttonDiv"),
                        {theme: "outline", size: "large"}  // customization attributes
                            );
                            google.accounts.id.prompt(); // also display the One Tap dialog
                        }
                        </script>
                    </Helmet>*/}
                    <div id="buttonDiv"></div>
                </div>
            </Col>
        </Row>
    </>;
}