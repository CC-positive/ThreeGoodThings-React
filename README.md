# ThreeGoodThings-API

![icon](https://user-images.githubusercontent.com/71970550/99811456-8d3c0680-2b88-11eb-9226-cc715a2bc9f8.png)

## Table of Contents

**[What is ThreeGoodThings](#what-is-threegoodthings)**<br>
**[What is ThreeGoodThingsAPI](#what-is-threegoodthingsapi)**<br>
**[HOW TO Install](#how-to-install)**<br>
**[HOW TO RUN](#how-to-run)**<br>
**[Remarks](#remarks)**<br>

## What is ThreeGoodThings

- ビジョン
  - 小さな幸せを分かち合う
  - ユーザが幸せを共有し合うことで、幸福度を高める
- ゴール
  - 日々３つの良いことを投稿できて、全体公開できる機能を実現する。

## What is ThreeGoodThingsAPI

本リポジトリは ThreeGoodThings 向けの API です。<br/>
API 仕様は以下をご確認ください。<br/>
https://cc-positive.github.io/ThreeGoodThings-API/dist/

## HOW TO INSTALL

- Postgresql をインストールしてください。
- config.json を各自の環境に合わせて修正してください。
  - username: Postgresql へアクセスするときのユーザ名。例：postgres
  - password: Postgresql へアクセスするときのパスワード。例：password
  - database : 利用する Postgresql の database オブジェクト名。
  - host: AP サーバからみた、DB サーバのホスト名。例：localhost

* yarn を実行して、必要なパッケージをインストールしてください。
* yarn setup を利用して、データベース環境のデータのセットアップを行ってください。

## HOW TO RUN

- コマンド実行（AP サーバの 8080 ポートで HTTP リクエストを受け付けます）
  - yarn start

## Remarks

- このリポジトリは Code Chrysalis の生徒であるときに作成しました（This was created during my time as a student at Code Chrysalis）

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
