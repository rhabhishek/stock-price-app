import React, {useEffect, useState} from 'react';
import LandingPage from "./landingPage";
import LoginPage from "./loginPage";
import {LogoutOutlined, StockOutlined, GithubOutlined} from "@ant-design/icons";
import {Layout, theme, Button, Divider} from "antd";

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
                <div className="logo"><StockOutlined className="icon"/> My Stock App</div>
                {/*<Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={[]}
                />*/}
                {loggedInUser && <div className="user">
                    {loggedInUser?.name}
                    <Divider type="vertical" style={{background: 'white'}}/>
                    <Button type="text" className="logoutBtn" onClick={logout}>Logout <LogoutOutlined /></Button>
                </div>}
            </Header>
            <Content style={{padding: '50px 50px 0 50px'}}>
                <div className="site-layout-content" style={{background: colorBgContainer}}>
                    {!loggedInUser && <LoginPage onLogin={setLoggedInUser}/>}
                    {loggedInUser && <LandingPage/>}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Created by Abhishek Rattihalli ©2023 <Divider type="vertical"/> <Button type="link" href="https://github.com/rhabhishek/stock-price-app"><GithubOutlined /> Github</Button></Footer>
        </Layout>
    </>;
}