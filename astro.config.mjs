import { defineConfig } from 'astro/config';

// 主站 zuoliangyu.netlify.app 与备用 zuoliangyu.github.io 都挂在根路径，无需 base。
export default defineConfig({
  site: 'https://zuoliangyu.netlify.app',
});
