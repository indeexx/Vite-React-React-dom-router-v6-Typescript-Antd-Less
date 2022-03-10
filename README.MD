## Vite React React-dom-router V6 Typescript Antd Less

### 模版创建

```javascript
# npm 6.x
npm init @vitejs/app vite-react-ts-antd-starter --template react-ts

# npm 7+, 注意--：
npm init @vitejs/app vite-react-ts-antd-starter -- --template react-ts
```

### 页面

新建pages文件夹，在文件夹下新建三个Home.tsx、About.tsx、NotFound.tsx文件：

Home.tsx:

```typescript
const Home = () => {
    return <div>
     home pages
    </div>
  }
  export default Home
```

About.tsx:

```typescript
const Home = () => {
    return <div>
     about pages
    </div>
  }
  export default Home
```

NotFound.tsx:

```typescript
const Home = () => {
    return <div>
     404 pages
    </div>
  }
  export default Home
```

### 安装路由V6

```javascript
npm i react-router-dom
```

由于改版本改动较大，所有使用详见文档 [reactrouter v6](https://reactrouter.com/docs/en/v6)

#### 路由拆分

新建router文件夹，在router文件夹下新建routes.ts:

```typescript
import Home from "./../pages/Home"
import About from "./../pages/About"
import NotFound from "./../pages/NotFound"

const Routes: any = [
    {
        path: "/",
        element: Home,
    },
    {
        path: "about",
        element: About,
    },
    {
        path: "404",
        element: NotFound,
    },
]

export default Routes;
```

#### 自定义History

新建history.ts:

```typescript
import { createBrowserHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

export const history = createBrowserHistory();

interface IHistoryRouteProps {
    history: typeof history;
}

export const IHistoryRouter: React.FC<IHistoryRouteProps> = ({ history, children }) => {
    const [state, setState] = React.useState(
        {
            action: history.action,
            location: history.location
        }
    );
    React.useLayoutEffect(() => {
        history.listen(setState);
    }, [history]);
    return React.createElement(Router, Object.assign({ children, navigator: history }, state));
}
```

#### 使用路由

修改main.tsx:

```typescript
import React from 'react'
import ReactDOM from 'react-dom'
import { history, IHistoryRouter } from './router/history'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <IHistoryRouter history={history}>
      <App />
    </IHistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
```

修改App.tsx:

```typescript
import React from "react";
import { useRoutes } from 'react-router-dom';
import Routes from "./router/routes"

const App: React.FC = (): JSX.Element => {
  let routes: any = [];
  Routes.forEach((route: any, index: number) => {
    const Ele = route.element;
    const router = {
      path: route.path,
      element: <Ele />,
    };
    routes.push(router);
  });
  const router = useRoutes([...routes]);
  return <>{router}</>;
};
export default App;
```

### Less

```javascript
npm i less -D
```

### Ant Design UI

安装antd:

```javascript
npm i antd
```

安装antd icon:

```javascript
npm i -S @ant-design/icons
```

按需引入：

```javascript
npm i vite-plugin-imp -D
```

#### 配置antd插件和CSS Modules

详细配置信息，见[vite配置文档](https://vitejs.dev/config)

修改vite.config.ts:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from "vite-plugin-imp"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp(
      {
        optimize: true,
        libList: [
          {//antd
            libName: "antd",
            libDirectory: "es",
            style: (name) => `antd/es/${name}/style`,
          }
        ],
      },
    ),
  ],
  css: {
      modules: {//css modules
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
})
```

### proxy代理

配置完css Modules后，在下面直接配置代理：

```javascript
//...
server: {
    proxy: {
      "/api/": {
        target: "/",
        changeOrigin: true,
      }
    }
  }
  //...
```

### alias别名

安装typescript版本的node：

```typescript
npm i @types/node -D
```

接着直接根据vite文档配置：

```typescript
//  ...
import path from 'path'
//...
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  //...
```

然后配置tsconfig中的compilerOptions:

```javascript
//...
"paths": {
      "@/*": ["./src/*"]
    }
//...
```

然后在Home.tsx中测试以上配置：

```typescript
import { history } from "../router/history";
import { Button } from "antd";
import Icon, { CheckOutlined } from "@ant-design/icons"
import styles from "./Home.module.less"

const PandaSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path
      d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
      fill="#6B676E"
      p-id="1143"
    />
    <path
      d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
      fill="#FFEBD2"
      p-id="1144"
    />
    <path
      d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
      fill="#E9D7C3"
      p-id="1145"
    />
    <path
      d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
      fill="#FFFFFF"
      p-id="1146"
    />
    <path
      d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
      fill="#6B676E"
      p-id="1147"
    />
    <path
      d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
      fill="#464655"
      p-id="1148"
    />
    <path
      d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
      p-id="1149"
    />
    <path
      d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
      p-id="1150"
    />
  </svg>
);

const PandaIcon = (props: any) => <Icon component={PandaSvg} {...props} />;

console.log("%c环境变量:", "color: blue; font-size: 20px;");
console.log(import.meta.env);

const Home = () => {
  const handleClick = () => {
    history.push("/about");
  }
  return <div className={styles.home}>
    <CheckOutlined />
    <PandaIcon style={{ fontSize: '32px' }} />
    <Button type="primary" onClick={handleClick}>跳转</Button>
    <div className={styles.div}>
      Hello Indeex</div>
  </div>
}
export default Home
```

Home.module.less:

```less
.Home{
    background-color: blueviolet;
    .div{
        background-color: lightcoral;
    }
}
```

### axios请求

```javascript
npm i -S axios
```

可直接在需要的地方引入，也可以自行封装

### 环境变量

根目录新增.env文件：

```javascript
NODE_ENV=development
VITE_APP_NAME=dev-indeex
```

和和.env.prod文件：

```javascript
NODE_ENV=production
VITE_APP_NAME=prod-indeex
```

以修改环境变量名，修改后在src下新增env.d.ts:

```typescript
interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
```

然后重启npm或yarn，通过：

```typescript
console.log(import.meta.env.VITE_APP_NAME);
```

获取自定义的环境名，也可以不修改环境变量名，使用默认的。


以上就可以使用在PC端，如果需要移动端，需要更换antd UI库并继续配置。
