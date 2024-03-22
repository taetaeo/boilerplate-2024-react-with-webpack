## 1. package.json 생성

```bash
#  package.json 생성
$ yarn init -y
```

## 2. React 설치

```bash
# react 필수 라이브러리 설치
$ yarn add react react-dom
```

## 3. Typescript 설정

Typescript를 사용하기에 관련 패키지를 설치한 후, Typescript 설정 파일을 초기화합니다.

### 3.1. 패키지 설치

```bash
# typescript, react @types 설치
$ yarn add -D typescript @types/react @types/react-dom


# tsconfig.json 생성 및 초기화
$ yarn tsc --init
```

### 3.2. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2021", // 코드를 어떤 ECMAScript 버전으로 컴파일할 지 지정합니다.
    "lib": ["dom", "dom.iterable", "esnext"], // 컴파일러에서 사용할 라이브러리를 지정합니다.
    "allowJs": true, // JavaScript 파일도 컴파일할 것인지 여부를 설정합니다.
    "skipLibCheck": true, // 라이브러리 파일을 검사하지 않을 것인지 여부를 설정합니다.
    "esModuleInterop": true, // CommonJS 모듈을 ES 모듈처럼 가져오고 내보낼 수 있도록 설정합니다.
    "allowSyntheticDefaultImports": true, // default import 및 export를 허용합니다.
    "strict": true, // 엄격한 타입 검사 옵션을 활성화합니다.
    "forceConsistentCasingInFileNames": true, // 파일 이름의 대소문자 일관성을 강제합니다.
    "noFallthroughCasesInSwitch": true, // switch 문에서 case 절이 중첩되는 것을 방지합니다.
    "module": "esnext", // 모듈 코드를 어떤 형식으로 생성할 지 지정합니다.
    "moduleResolution": "node", // 모듈 해결 전략을 지정합니다.
    "resolveJsonModule": true, // JSON 모듈을 해석할 수 있도록 설정합니다.
    "isolatedModules": true, // 각 파일을 독립적인 모듈로 처리할 지 여부를 설정합니다.
    "jsx": "react-jsx", // JSX를 어떻게 처리할 지 지정합니다.
    "noEmit": false, // 출력 파일을 생성하지 않도록 설정합니다.
    "baseUrl": "./src", // 모듈 해석을 시작할 기본 경로를 지정합니다.
    "paths": {
      "@components/*": ["components/*"] // 모듈을 참조할 때 사용할 경로 별칭을 설정합니다.
    },
    "outDir": "./dist" // 컴파일된 파일의 출력 디렉토리를 지정합니다.
  },
  "include": ["src/**/*"], // 컴파일할 파일을 지정합니다.
  "exclude": ["node_modules"] // 컴파일에서 제외할 파일을 지정합니다.
}
```

## 4. webpack, webpack plugins, loader, devServer 설정

### 4.1. 패키지 설치

```bash
# webpack을 위한 필수 라이브러리 설치
$ yarn add -D webpack webpack-cli

# 번들링 후, import하는 라이브러리 설치
$ yarn add -D html-webpack-plugin

# Typescript 파일 JavaScript 파일로 변환하는 라이브러리 설치
$ yarn add -D ts-loader

# 개발할 때 사용하는 웹서버
$ yarn add -D webpack-dev-server

# 개발/배포 모드 분리 라이브러리 설치
$ yarn add -D webpack-merge

# 빌드시 자동 제거하는 플러그 설치
$ yarn add -D clean-webpack-plugin

# Typescript path를 인식하기 위한 플러그인 설치
$ yarn add --D tsconfig-paths-webpack-plugin
```

### 4.2. 패키지 정보

1. **webpack**
   - 웹팩 그 자체의 패키지로 웹 팩 라이브러리
2. **webpack-cli**
   - 터미널에서 webpack 커맨드를 실행할 수 있게 해주는 커맨드라인 도구
   - 즉, 명영어로 웹팩을 이용할 수 있는 라이브러리
3. **html-webpack-plugin**
   - 번들링 후, 만들어 놓은 템플릿 `html` 파일을 이용해 번들링 된 `js` 를 `import` (`<script type="module" src="./dist/about.bundle.js"></script>`) 하는 `html` 파일을 새로 만들어서 `output` 디렉터리에 생성
4. **ts-loader**
   - ts-loader 는 Webpack과 함께 사용되며, TypeScript 파일(`.ts` 또는 `.tsx`)을 JavaScript로 변환하기 위해 사용됩니다.
   - 즉, TypeScript 코드를 일반 JavaScript로 변환하고 웹 애플리케이션 번들에 포함시킬 수 있습니다.
5. **webpack-dev-server** : 빠른 실시간 리로드를 가능하게 하는 개발 서버

   - 디스크에 저장되지 않는 메모리 컴파일을 사용하기 때문에 컴파일 속도가 빠름
   - webpack.config.js에서 devServer 옵션을 통해 옵션을 지정하여 사용이 가능함

6. **webpack-merge** :

   - webpack을 `dev`, `prod` 모드로 분리 구축을 지원합니다.

7. **others** :
   - `yarn add clean-webpack-plugin` : 빌드시에 이전 빌드 결과물을 자동으로 제거해주는 플러그인
   - `tsconfig-paths-webpack-plugin` : TypeScript 프로젝트에서 웹팩을 사용할 때, TypeScript의 path mapping 설정을 해석하여 웹팩 번들링 시에 해당 경로를 해결해주는 플러그인

## 5. 웹팩 설정하기 (Common | Development | Production)

### 5.1. 웹팩 공통 설정하기 (feat. webpack.common.js)

> 이 파일은 `prod` 또는 `dev` 모드에서 공통으로 사용하는 설정입니다.

1. **entry** : 처음 실행되는 기본 시작 파일
2. **resolve** : 확장자나 경로를 처리하기 위해 설정하는 옵션
3. **module** : `ts-loader`, `babel-loader`를 설정하는 부분
   - `loader` 는 오른쪽에서 왼쪽 방향으로 적용되기에 `ts-loader` 를 `babel-loader`보다 오른쪽에 위치시켜야 합니다.
4. **output**: 번들화 된 파일을 export할 경로와 파일명을 설정하는 부분입니다.
5. **plugins** : 설치한 플러그인을 적용하는 옵션

```js
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true, // 빈칸 제거
        removeComments: true, // 주석제거
      },
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    hot: true,
    open: true,
  },
};
```

### 5.2. 웹팩 개발 모드 설정 (feat. webpack.dev.js)

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
});
```

### 5.3. 웹팩 배포 모드 설정 (feat. webpack.prod.js)

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
});
```

## 6. CSS / SCSS 파일 import하기

> `style-loader` , `css-loader`, `sass-loader`
>
> webpack을 이용한 React.js 환경에서 css파일을 import하기 위해서 관련된 loader 를 설치합니다.

기본적으로 React.js에서 컴포넌트들의 스타일을 설정할땐, `inline Style`을 사용합니다. 이는 `style` 을 JavaScript 객체형으로 만들어 사용하도록 유도합니다.
하지만, 이 방법외에도 `css` 또는 `scss` 파일을 직접 import하여 사용하는 방법이 있습니다.

### 6.1. 패키지 설치

```bash
# style loader 설치
$ yarn add -D style-loader

# css loader 설치
$ yarn add -D css-loader

# sass loader 설치
$ yarn add -D sass-loader sass webpack
```

이후에 `webpack.common.js` 파일에 다음의 loader를 사용하도록 추가합니다.

### 6.2. loader 설정

```js

// ... 중략
    {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
        ],
    }
// ... 중략
```

`css` 또는 `scss` 파일에 대해 순차적으로 `style-loader` , `css-loader`, `sass-loader` 순으로 파일을 읽어내려갈 수 있도록 합니다.

## 7. Babel 설정

보통 `ES6+`문법으로 코드를 작성하면 IE 웹 브라우저와 같이 구형 브라우저에서는
제대로 지원이 되지 않습니다. 따라서, `Babel` 을 통해서 ES6+ 문법을 IE에서도 사용할 수 있게 지원하도록 합니다.

### 7.1. 패키지 설치

```bash
#
$ yarn add -D babel-loader @babel/core @babel/preset-env

#
$ yarn add -D @babel/preset-react @babel/preset-typescript

```

**1. babel-loader, @babel/core, @babel/preset-env**

- babel JavaScript 컴파일러를 활용하여 IE에서도 ES6+ 문법을 사용할 수 있게 한다.

**2. @babel/preset-typescript**

- 원래 바벨과 타입스크립트는 따로 작업이 되었지만,
  해당 플러그인을 통해 타입스크립트와 바벨이 조화롭게 병합하여 사용하게 된다.
- TypeScript를 사용한다면 필요한 플러그인들의 집합이다.

**3. @babel/preset-react**

- jsx로 작성된 코드들을 createElement 함수를 이용한 코드로 변환해 주는
  바벨 플러그인이 내장되어 있음
- React를 사용한다면 필요한 플러그인들의 집합이다.

### 7.2. 패키지 설정

루트 디렉토리에 `babel.config.js` 파일을 설치한 뒤, 다음의 코드를 작성합니다.

```js
// babel.config.js
module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
};
```

## 8. eslint, prettier 설정

### 8.1. 패키지 설치

```bash
# eslint 설치
$ yarn add -D @eslint/config

# prettier 설치
$ yarn add -D prettier
```

### 8.2. 패키지 설정 - prettier

```js
// .prettierrc.js
module.exports = {
  printWidth: 180, // 한 줄에 출력되는 코드의 최대 길이
  tabWidth: 2, // 탭 간격의 크기를 설정
  endOfLine: 'auto', // 줄 바꿈 문자열을 지정
  singleQuote: true, //  문자열을 작은 따옴표로 표시
  trailingComma: 'all', // 후행 쉼표를 모든 요소에 적용
  arrowParens: 'avoid', // 화살표 함수의 매개변수가 하나일 때 괄호를 생략하도록 설정
};
```

### 8.3. 패키지 설정 - eslint

```js
// .eslintrc.js
module.exports = {
  // 코드 실행 환경 설정
  env: {
    browser: true, // 브라우저 환경
    es2021: true, // ECMAScript 2021
    node: true, // Node.js 환경
  },
  // 확장 설정 - 기존 규칙 확장
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier'],
  // 파서 설정 - TypeScript 사용
  parser: '@typescript-eslint/parser',
  // 파서 옵션 설정
  parserOptions: {
    ecmaVersion: 'latest', // ECMAScript 버전
    sourceType: 'module', // 모듈 형식
  },
  // 플러그인 설정
  plugins: ['@typescript-eslint', 'react'],
  // 규칙 설정
  rules: {
    '@typescript-eslint/no-var-requires': 'off', // TypeScript의 require 사용 금지 규칙 끄기
    '@typescript-eslint/consistent-type-imports': 'error', // 일관된 타입 임포트 규칙 활성화
  },
};
```

## 9. 디렉터리 생성

### 9.1. `/src` 디렉터리

실제 프로젝트의 소스코드들이 작성될 폴더입니다. 이 프로젝트의 진입점이 될 `index.tsx` 파일과 `app.tsx` 을 만들어 줍니다.

- `index.tsx` : 최초의 entry point로서, React의 `app.tsx`파일을 랜더링하도록 합니다.
- `app.tsx` : 프로젝트의 시작 부분을 담당합니다. 주로, router 또는 최고 상단의 상태관리를 위한 provider을 연동시킬 수 있습니다.

### 9.2. `/public` 디렉터리

프로젝트의 본체인 `index.html`을 생성하며, `image/` 폴더를 통해 `.png` , `.svg` 파일과 같은 정적 파일이 위치합니다. 이곳에 favicon등을 `index.html`에 연결시킵니다.

```html
<!-- index.html -->
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[2024] React + Typescript with Webpack boilerplate</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## 11. Router 설정

### 11.1 패키지 설치

```bash
# React Router Dom 설치
$ yarn add -D react-router-dom
```

### 11.2. route.config 설정

```tsx
// configs/router.config.tsx
import { createBrowserRouter } from 'react-router-dom';

// Configs
import pageUrlConfig from './pageUrl.config';
// layouts
import LayoutDefault from '@components/blocks/layouts/layoutDefault';
// Pages
import HomePage from '@components/pages/home';
import TestPage from '@components/pages/test';

export default createBrowserRouter([
  {
    path: pageUrlConfig.main,
    element: <LayoutDefault />,
    children: [
      { path: '', element: <HomePage /> },
      { path: pageUrlConfig.test, element: <TestPage /> },
    ],
  },
]);

// app.tsx
import { RouterProvider } from 'react-router-dom';
// Configs
import routerConfig from '@configs/router.config';

const App = () => {
  return <RouterProvider router={routerConfig} />;
};

export default App;
```

## 12. webpack5를 위한 라이브러리 설치

### 12.1. 환경변수 경로 설정 (process)

process를 사용하면서 환경변수의 경로를 잡고자 할때, Webpack 5의 주요 변경된 사항으로 config를 통해서 plugin으로 호출해야 합니다.

```ts
module.exports = {
  entry: './src/index.tsx',
  output: {
    // 중략
  },
  resolve: {
    // 중략
  },
  module: {
    // 중략
  },
  plugins: [
    // 기타 다른 Plugin
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
  ],
};
```

## 14. MSW 설치

> `MSW` 는 mocking service worker의 약자로 말 그대로 service worker를 이용하여 가짜 Api를 mocking 하는 역할을 합니다.

### 14.1. 패키지 설치

```bash
# 1. npm
# msw 설치
$ npm install msw

# 2. yarn
# msw 설치
$ yarn add msw
```

### 14.2. service worker 설정

```bash
# service worker 설정
$ npx msw init public/ --save

```

터미널에 다음의 명령어를 입력하면, `mockServiceWorker.js` 파일이 생성됩니다.

### 14.3. msw api 모킹 소개

![msw](https://raw.githubusercontent.com/taetaeo/react-ts-webpack-boilerplate-2024/main/public/images/msw.png)

### 14.4. 사용법

> /src/\_mocks 에서 확인할 수 있습니다.

- `resolver` : mock data를 위한 controller의 역할을 합니다.,
- `db` : 가상의 데이터 베이스

```tsx
const HomePage = () => {
  useEffect(() => {
    fetch('/api/dummy')
      .then(response => response.json())
      .then(console.log)
      .catch(console.error);
  }, []);

  return <div>Home화면</div>;
};
```

이러한 방법으로 가짜 서버를 통해 API요청을 보내고 데이터를 응답으로 받을 수 있습니다.

## 15. Test 설정

### 15.1. 패키지 설치 - jest 설치

이 테스트 코드등을 통해서 유틸 함수를 테스트 하기 위해 테스트 도구 jest를 설치합니다.

```bash
# jest 설치
$ yarn add -D jest ts-jest

# jest 타입스크립트 설치
$ yarn add -D @types/jest @types/node
```

### 15.2. 패키지 설정

`/` (루트 디렉터리)에 `jest.config.js` 파일을 생성 후 다음과 같이 코드를 작성합니다.

```js
// jest.config.js

/**
 * Jest의 설정 파일인 jest.config.js입니다.
 * 이 파일은 Jest가 프로젝트의 테스트를 실행하는 방식을 지정합니다.
 */

/**
 * TypeScript로 작성된 Jest 설정 파일임을 나타내며,
 * ts-jest 패키지에서 가져온 JestConfigWithTsJest 타입을 사용한다는 것을 선언합니다.
 */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Jest에게 TypeScript 프로젝트를 다룰 수 있도록 하는 ts-jest preset을 사용하도록 지시합니다.
  preset: 'ts-jest',
  // Jest가 테스트를 실행할 환경을 지정합니다. 현재 설정에서는 'node'로 지정되어 있으므로, 테스트는 Node.js 환경에서 실행됩니다.
  testEnvironment: 'node',
  // 모듈 이름을 매핑하는 데 사용됩니다. '~/'로 시작하는 모든 모듈을 '<rootDir>/src/'로 매핑하여 상대 경로 대신 절대 경로로 참조할 수 있습니다.
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  // Jest가 각 테스트 후에 모든 모의 함수(mock functions)의 상태를 자동으로 재설정하도록 지시합니다. 이렇게 함으로써 각 테스트 간에 모의 함수의 상태가 격리됩니다.
  clearMocks: true,
};
```

### 15.3. package.json에 script 추가

```json
  "scripts": {
    "test": "jest --watchAll",
    "dev": "webpack-dev-server --config ./webpack/webpack.dev.js --open --hot",
    "build": "webpack --config ./webpack/webpack.prod.js",
    "start": "webpack-dev-server --config ./webpack/webpack.dev.js --open --hot",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },

```

### 15.4. `__test__` 폴더 생성

**_테스트 코드 작성 예시_**

```ts
// isEmptyArray.test.ts

describe('isEmptyArrayHelper', () => {
  it('빈 배열에 대해 true를 반환해야 합니다.', () => {
    expect(isEmptyArrayHelper([])).toBe(true);
  });

  it('비어 있지 않은 배열에 대해 false를 반환해야 합니다.', () => {
    expect(isEmptyArrayHelper([1, 2, 3])).toBe(false);
  });

  it('비어 있지 않은 배열에 대해 false를 반환해야 합니다.', () => {
    expect(isEmptyArrayHelper([undefined])).toBe(false);
  });
});
```

`yarn test` 실행을 통해 다음과 같은 결과를 얻습니다.

```
isEmptyArrayHelper

  √ 빈 배열에 대해 true를 반환해야 합니다. (4 ms)
  √ 비어 있지 않은 배열에 대해 false를 반환해야 합니다.

  Test Suites: 1 passed, 1 total
  Tests:       2 passed, 2 total
  Snapshots:   0 total
  Time:        2.835 s
  Ran all test suites.

  Watch Usage: Press w to show more.
```

## 16. index.tsx 파일 설정

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('@mocks/browser/worker');
  return worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
```

가상의 mock api와의 연동을 위해 service worker와 연결을 합니다.

## 18. package.json 필드 설정

```json
{
  "name": "프로젝트 이름",
  "version": "0.0.1",
  "main": "index.tsx",
  "repository": {
    "directory": "https://github.com/[레포지토리이름].git"
  },
  "author": "깃헙아이디 <깃헙 이메일>",
  "license": "MIT",
  "scripts": {
    "test": "jest --watchAll",
    "dev": "webpack-dev-server --config ./webpack/webpack.dev.js --open --hot",
    "build": "webpack --config ./webpack/webpack.prod.js",
    "start": "webpack-dev-server --config ./webpack/webpack.dev.js --open --hot",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "msw": "^2.2.10",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "taeo-hooks": "^1.0.25"
  },
  "devDependencies": {
    "@babel/core": "^7.24.1",
    "@babel/preset-env": "^7.24.1",
    "@babel/preset-react": "^7.24.1",
    "@babel/preset-typescript": "^7.24.1",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.67",
    "@types/react-dom": "^18.2.22",
    "babel-loader": "^9.1.3",
    "clean-webpack-plugin": "^4.0.0",
    "css-loader": "^6.10.0",
    "html-webpack-plugin": "^5.6.0",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "process": "^0.11.10",
    "sass": "^1.72.0",
    "sass-loader": "^14.1.1",
    "style-loader": "^3.3.4",
    "ts-jest": "^29.1.2",
    "ts-loader": "^9.5.1",
    "tsconfig-paths-webpack-plugin": "^4.1.0",
    "typescript": "^5.4.2",
    "webpack": "^5.90.3",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.0.4",
    "webpack-merge": "^5.10.0"
  },
  "msw": {
    "workerDirectory": "public"
  }
}
```
