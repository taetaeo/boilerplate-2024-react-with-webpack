## 1. package.json 생성

```bash
#  package.json 생성
$ yarn init -y

```

## 2. React, Typescript 설치

```bash
# react 필수 라이브러리 설치
$ yarn add react react-dom

# typescript, react @types 설치
$ yarn add -D typescript @types/react @types/react-dom


# tsconfig.json 생성
$ yarn tsc --init

```

## 3. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["dom", "ES2015", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020"],
    "allowJs": true,
    "jsx": "preserve",
    "sourceMap": true,
    "outDir": "./dist",
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@components/*": ["components/*"],
      "@pages/*": ["pages/*"]
    },
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 4. webpack, webpack plugins, loader, devServer 설치

```bash
# webpack을 위한 필수 라이브러리 설치
$ yarn add webpack webpack-cli --dev

# 번들링 후, import하는 라이브러리 설치
$ yarn add html-webpack-plugin --dev

# Typescript 파일 JavaScript 파일로 변환하는 라이브러리 설치
$ yarn add ts-loader --dev

# 개발할 때 사용하는 웹서버
$ yarn add webpack-dev-server --dev

# 개발/배포 모드 분리 라이브러리 설치
$ yarn add webpack-merge --dev
```

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

6. **webpack-merge** : webpack을 `dev`, `prod` 모드로 분리 구축을 지원합니다.

## 5. 웹팩 설정하기 (common | dev | prod)

### 5.1. 웹팩 공통 설정하기 (feat. webpack.common.js)

> 이 파일은 `prod` 또는 `dev` 모드에서 공통으로 사용하는 설정입니다.

1. **entry** : 처음 실행되는 기본 시작 파일
2. **resolve** : 확장자나 경로를 처리하기 위해 설정하는 옵션
3. **module** : `ts-loader`, `babel-loader`를 설정하는 부분
   - `loader` 는 오른쪽에서 왼쪽 방향으로 적용되기에 `ts-loader` 를 `babel-loader`보다 오른쪽에 위치시켜야 합니다.
4. **output**: 번들화 된 파일을 export할 경로와 파일명을 설정하는 부분입니다.
5. **plugins** : 설치한 플러그인을 적용하는 옵션

## 5.2. 웹팩 개발 모드 설정 (feat. webpack.dev.js)

## 6. CSS 파일 import하기

> style-loader , css-loader
>
> webpack을 이용한 React.js 환경에서 css파일을 import하기 위해서 관련된 loader 를 설치합니다.

기본적으로 React.js에서 컴포넌트들의 스타일을 설정할 땐, `inline Style`을 사용합니다. 이는 `style` 을 JavaScript 객체형으로 만들어 사용하도록 유도합니다.
하지만, 이 방법외에도 `css` 또는 `scss` 파일을 직접 import하여 사용하는 방법이 있습니다.

```bash
# style loader 설치
$ yarn add -D style-loader

# css loader 설치
$ yarn add -D css-loader

# sass loader 설치
$ yarn add -D sass-loader sass webpack
```

이후에 `webpack.common.js` 파일에 다음의 loader를 사용하도록 추가합니다.

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

## 7. Babel 설정
