import React, {useEffect} from 'react';
import {Col, Divider, Row, Typography} from 'antd';
import {GOOGLE_APP_CLIENT_ID} from "../constants";
import jwt_decode from "jwt-decode";
import {StockOutlined} from "@ant-design/icons";

const {Title} = Typography;

export default function LoginPage({onLogin}) {


    // https://developers.google.com/identity/gsi/web/reference/js-reference

    useEffect(() => {
        const onSuccess = (res) => {
            let userInfo = jwt_decode(res.credential);
            localStorage.setItem("user", JSON.stringify(userInfo));
            onLogin(userInfo);
        };

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
    }, []);


    // @ts-ignore
    return <>
        <Row>
            <Col span={18} style={{padding: "40px"}}>
                <Title style={{textAlign: "justify"}}>
                    <StockOutlined className="icon" style={{fontSize: "xxx-large", color: "darkgreen"}}/> Stock Info
                </Title>
                    <Title level={4} style={{textAlign: "justify"}}>
                        Welcome to StockInfo, your one-stop destination for all things stocks. Whether you're a seasoned investor or just starting out, we have the tools and resources you need to stay informed and make smart investment decisions.

                    Our website offers a wide range of information on various stocks and markets, including real-time stock quotes, historical data, financial news, and market analysis. We also provide interactive charts and tools to help you understand and track the performance of your portfolio.

                    In addition to stock information, we also offer educational resources to help you learn more about investing and the stock market. From beginner guides to advanced strategies, our goal is to empower you with the knowledge you need to succeed.

                    Thank you for visiting StockInfo. We hope you find our website useful and informative, and we look forward to helping you navigate the markets with confidence.
                    </Title>

            </Col>
            <Divider type="vertical" style={{height: "inherit"}}/>
            <Col span={5} style={{padding: "20px"}}>
                <Divider orientation="left">Sign In</Divider>
                <div id="buttonDiv"></div>
            </Col>
        </Row>
    </>;
}