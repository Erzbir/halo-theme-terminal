# Terminal

一款 Terminal 风格的 Halo 主题, 基于 wan92hen 的 [Terminal](https://github.com/wan92hen/theme-terminal) 修改

<img src="https://raw.githubusercontent.com/Erzbir/halo-theme-terminal/refs/heads/main/preview/scheme.png" alt="scheme">

前往: https://erzbir.com 查看

## 对原主题的修改

### 新增功能
1. 支持 PJAX 
2. 支持亮暗模式 
3. 支持指定亮暗模式配色 
4. 支持子菜单 
5. 支持像素化开关
6. 支持文章目录开关

### 样式
1. 去除 a 标签的下划线 
2. 修改分页与评论的排列顺序
3. 修改默认字体为 JetBrains Mono
4. 修改一些固定文字
5. 修改 footer 样式并且兼容小屏
6. 修改文章之间的间隔
7. 修改滑轨颜色为透明
8. 修改滑块颜色
9. 修改文章目录样式, 去除选中时的背景色
10. 修改分页的样式, 只有一个时居中, 适配小屏端
11. 修改一些标签的大小以及间距
12. 修改标题与文章的分割线
13. 让代码块背景色适配主题 
14. 让搜索组件颜色适配主题 
15. 让评论颜色适配主题
16. 修改友链的样式
17. 修改标签页以及归档页及分类页的列表显示
18. 修改按扭边框样式
19. 修改代码块背景
20. 禁用字体连字
21. 在移动端菜单纵向排列
22. 调整各个元素的间距等
23. 文章目录响应式显示

### 优化
1. 防止由于滑块引起的页面抖动

### 开发相关
1. 项目迁移至 ES modules 使用原生 JS 开发 
2. 删除所有工具依赖, 引入 esbuild

## 关于 PJAX

**目前 PJAX 功能需要手动开启**

### 代码注入需注意的事项

预留了一个 `.ex-pjax` 类名, 可以通过将注入的标签设置 `class="ex-pjax"` 来使用 PJAX

如果要注入 `<script>`, 根据插入的位置需要为标签添加一些属性才能保证行为正常

在 `<head>`, `<footer>`, 以及 `.content` 下的 `<script>` 会被重新执行, 行为略有不同

- `<head>`: 重新执行所有请求页面新插入的无 `no-pjax` 属性的 `<script>`
- `<footer>`: 重新执行有 `data-pjax` 属性的 `<script>`
- `.content`: 重新执行有 `data-pjax` 属性的 `<script>`

设置 `no-pjax` 属性, 可以防止 `<script>` 被 PJAX 重新执行

### 已知的问题

首屏就加载全部 css 和 script 的情况下不会出现问题, 只有在动态注入的时候会出现一些问题

- highlightjs 插件的 _复制按扭_ 数量会随页面切换增加

## 构建

项目使用原生 ES 模块, 用 `esbuild` 来构建, 使用 `pnpm` 管理依赖

确保已安装 `nodejs`

执行:

```shell
make
```

## 计划

- [ ] 自定义配色
- [ ] 调整代码高亮
- [ ] 本地化

## 原主题

- [Terminal](https://github.com/wan92hen/theme-terminal)
- [Hugo Terminal](https://github.com/panr/hugo-theme-terminal)
