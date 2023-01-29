import React, {useEffect, useState} from 'react';
import LandingPage from "./landingPage";
import LoginPage from "./loginPage";
import {GithubOutlined, LogoutOutlined, StockOutlined} from "@ant-design/icons";
import {Button, Col, Divider, Layout, Row, theme,} from "antd";

const {Header, Content, Footer} = Layout;

export default function Index() {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [loggedInUser, setLoggedInUser] = useState<any>(null);

    useEffect(() => {
        const theUser = localStorage.getItem("user");

        if (theUser && !theUser.includes("undefined")) {
            setLoggedInUser(JSON.parse(theUser));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return <>
        <Layout className="layout">
            <Header>
                <div className="logo"><StockOutlined className="icon"/> Stock Info</div>
                {loggedInUser && <div className="user">
                    {loggedInUser?.name}
                    <Divider type="vertical" style={{background: 'white'}}/>
                    <Button type="text" className="logoutBtn" onClick={logout}>Logout <LogoutOutlined/></Button>
                </div>}
            </Header>
            <Content style={{padding: '50px 50px 0 50px'}}>
                <div className="site-layout-content" style={{background: colorBgContainer}}>
                    {!loggedInUser && <LoginPage onLogin={setLoggedInUser}/>}
                    {loggedInUser && <LandingPage/>}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>

                <Row style={{textAlign: "justify"}}>
                    <Col>
                        Disclaimer: The information provided on StockInfo is for informational purposes only. The data
                        and
                        analysis presented on our website should not be considered as investment advice or a
                        recommendation
                        to buy or sell any securities. The stock prices and other data provided on our website are
                        obtained
                        from third-party sources and are believed to be accurate, but we cannot guarantee their
                        accuracy.
                        All investments involve risk and the past performance of a security does not guarantee future
                        results or returns. StockInfo does not endorse any particular security or investment strategy.
                        It is
                        important to conduct your own research and due diligence before making any investment decisions.
                    </Col>
                </Row>
                <Divider/>
                <Row><Col span={24}>
                    Created by Abhishek Rattihalli ©2023 <Divider type="vertical"/>
                    <Button type="link" href="https://github.com/rhabhishek/stock-price-app">
                        <GithubOutlined/> Github
                    </Button>
                </Col></Row>


            </Footer>
        </Layout>
    </>;
}