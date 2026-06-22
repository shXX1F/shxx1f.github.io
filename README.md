# shxx1f.github.io

这是 `shXX1F` 的 GitHub Pages 个人主页，当前采用横向三栏布局：

- 左侧：个人信息、页面导航、Dark Mode
- 中间：主要内容卡片
- 右侧：搜索、归档、分类和标签

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

## 修改内容

- 页面内容主要在各个 `.html` 文件
- 横向布局和响应式样式在 `styles.css`
- GitHub 项目读取、搜索过滤和 Dark Mode 在 `script.js`
