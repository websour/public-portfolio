<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/styled--components-000000?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <!-- サーバー -->
  <img src="https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=for-the-badge">
</p>
## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

## プロジェクト名

PortfolioYS

## プロジェクトについて
スキルセットを説明するための、ポートフォリオサイトです。
### 主要機能：
簡易認証、お問い合わせ、AIチャット

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

| 言語/フレームワーク      | バージョン |
| --------------------- | -------- |
| Node.js               | 16.17.0  |
| Next.js               | 14.0.4   |
| React                 | 18       |
| TypeScript            | 5        |
| styled-components     | 6.1.6    |

| ライブラリ      　      | バージョン |
| --------------------- | -------- |
| microcms-js-sdk       | 2.7.0    |
| react-hook-form       | 7.50.1   |

その他のパッケージのバージョンは package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
.
├── .gitignore
├── .next
├── app
│   ├── api
│   ├── components
│   │   ├── Button
│   │   ├── Description
│   │   ├── Heading
│   │   ├── Layouts
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LoginHeader.tsx
│   │   │   └── Main.tsx
│   │   └── Loading
│   ├── Pages
│   │   ├── Home
│   │   └── LoginForm
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── login
│   │   ├── page.module.css
│   │   ├── page.tsx
│   │   └── registry.tsx
│   ├── themes
│   └── types
│       └── certificates
│           └── jsonwebtoken.d.ts
├── next-env.d.ts
├── next.config.js
├── node_modules
├── package.json
├── public
├── README.md
└── tsconfig.json

## サイト設計
components/ - UIのビルディングブロック。ボタン、ヘッダーなど再利用可能なコンポーネントを格納します。
api/ - サーバーサイドAPIのエンドポイント。バックエンドロジックとのインターフェースを提供します。
public/ - 静的ファイルとアセット。画像やフォントなどが含まれます。
styles/ - CSSやSCSSファイル。アプリケーションのグローバルスタイルや変数定義を含みます。
lib/ - 共有ロジックとヘルパー関数。データ取得やユーティリティ関数などを配置します。
config/ - 設定ファイル。Next.jsやその他のライブラリの設定を含みます。


<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

### 動作確認

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<p align="right">(<a href="#top">トップへ</a>)</p>
