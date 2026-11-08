# zuoliangyu.github.io

左岚（zuoliangyu）的站点导航：把散落在 GitHub Pages 上的工具、资料和博客集中到一页，附说明和跳转。

在线地址：https://zuoliangyu.netlify.app/ （备用：https://zuoliangyu.github.io/）

## 新增 / 修改站点

只需编辑 [`src/data/sites.yaml`](src/data/sites.yaml)，推送到 `main` 后自动部署。字段说明见文件开头注释。

填写了 `repo` 的条目，构建时会从 GitHub API 自动补全 star 数、语言和最近推送时间；工作流每天定时重建一次以刷新这些数据。

## 本地开发

```bash
npm ci
npm run dev      # 本地预览
npm run build    # 构建到 dist/
```

本地构建默认匿名调用 GitHub API（60 次/小时）；设置环境变量 `GITHUB_TOKEN` 可提高额度。

## 部署

`.github/workflows/pages.yml`：推送 `main`、每日定时或手动触发时构建一次，同时发布到 Netlify（主站，需要仓库 secrets `NETLIFY_AUTH_TOKEN` / `NETLIFY_SITE_ID`）和 GitHub Pages（备用，Settings → Pages → Source 需为 GitHub Actions）。

收录的各站点也一样：Netlify 为主站，GitHub Pages 为备用。
