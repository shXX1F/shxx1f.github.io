# shxx1f.github.io

这是 `shXX1F` 的 GitHub Pages 个人主页，当前是多页面个人站结构。

## 页面结构

- `index.html`：首页
- `resume.html`：在线简历
- `works.html`：个人作品
- `journey.html`：人生历程
- `about.html`：关于联系

## 本地预览

直接打开 `index.html` 即可预览。也可以在本目录运行静态服务器：

```powershell
python -m http.server 4173
```

然后访问：

```text
http://127.0.0.1:4173/
```

## 发布到 GitHub Pages

1. 确认仓库名为 `shxx1f.github.io`
2. 把本目录文件提交到仓库根目录
3. 进入仓库 `Settings -> Pages`
4. 选择 `Deploy from a branch`
5. Branch 选择 `main`，目录选择 `/root`
6. 等待 GitHub Pages 完成部署

部署后的地址：

```text
https://shxx1f.github.io/
```

## 修改内容

- 简历内容主要在 `resume.html`
- 项目展示主要在 `works.html`
- 页面样式在 `styles.css`
- GitHub 项目自动读取和备用项目在 `script.js`
