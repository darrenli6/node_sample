# Google 第三方登录demo

## 安装及运行

1. 建立环境变量

请自行前往 [Google Developers Console](https://console.developers.google.com/) 申请 OAuth 2.0 凭证，并将 .env.sample 转为 `.env` 文件，按照需求填入。

2. 终端输入：

```
npm install
npm start
```
3. 配置 Google OAuth 2.0

在 Google Developers Console 中创建项目后,需要进行以下配置:

- 在"OAuth 同意屏幕"中设置应用名称、用户支持电子邮件等基本信息
- 在"凭据"页面创建 OAuth 2.0 客户端 ID
- 添加授权的重定向 URI,例如: `http://localhost:4321/auth/google/callback`
- 记录生成的客户端 ID 和客户端密钥

4. 环境变量说明

- GOOGLE_CLIENT_ID: Google OAuth 2.0 客户端 ID
- GOOGLE_SECRET_KEY: Google OAuth 2.0 客户端密钥 
- HOST: 应用程序主机地址
- JWT_SECRET: JWT 签名密钥
 

## 参考

- [Google Developers Console](https://console.developers.google.com/)
- [Google Auth Library](https://www.npmjs.com/package/google-auth-library)
- [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata)