import React, {useEffect} from 'react';
import type { FC } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import Index from "./components";

const App: FC = () => {
    return <div className="App">
            <Index/>
        </div>
    };

export default App;