# Terminal-EZ

一款简洁, 复古的 Terminal 风格 Halo 主题

![配色预览](https://raw.githubusercontent.com/Erzbir/halo-theme-terminal/refs/heads/main/preview/scheme.png)

## 功能

- Terminal 风格的响应式页面布局
- 深色, 浅色和跟随系统 3 种默认模式
- 12 套内置配色
- 访客配色选择器
- 常规图标和像素图标切换
- 内置 JetBrains Mono, Hack 字体, 可切换
- 可设置为访问者系统字体
- 自定义字体
- 基础行高, 文章段落间距和文章元信息分隔符配置
- 首页公告打字效果
- 文章目录和目录展开状态配置
- 文章标签, 置顶标记和上一篇/下一篇导航
- Halo 评论组件适配
- Halo 搜索组件适配
- PJAX 页面切换
- 多级菜单
- 社交资料和 RSS
- ICP 备案和公安备案信息
- 首页, 文章, 独立页面, 归档, 分类, 标签, 友链和错误页模板
- 瞬间, 朋友圈和项目作品集页面模板
- 英文, 简体中文, 繁体中文和西班牙文界面文本

## 页面和集成

| 页面或功能     | 模板或条件                                                                  |
|-----------|------------------------------------------------------------------------|
| 首页        | `templates/index.html`                                                 |
| 文章页       | `templates/post.html`                                                  |
| 独立页面      | `templates/page.html`                                                  |
| 归档页       | `templates/archives.html`                                              |
| 分类列表和分类详情 | `templates/categories.html`, `templates/category.html`                 |
| 标签列表和标签详情 | `templates/tags.html`, `templates/tag.html`                            |
| 友链页       | `templates/links.html`                                                 |
| 朋友圈       | `templates/friends.html`, 需要朋友圈插件                                      |
| 瞬间        | `templates/moments.html`, 需要瞬间插件                                       |
| 项目作品集     | `templates/portfolio.html`, `templates/portfolio-detail.html`, 需要作品集插件 |
| 搜索        | 启用搜索组件时页头显示搜索按钮                                                        |
| 评论        | 启用评论插件并开启评论功能时显示评论组件                                                   |
| 错误页       | 提供 `404`, `5xx` 和通用错误模板                                                |

## 主题设置

### 基本设置

| 设置      | 配置名                 | 说明                   |
|---------|---------------------|----------------------|
| Logo 文本 | `basic.logo`        | 留空时使用 Halo 站点标题      |
| 启用 PJAX | `basic.pjax_enable` | 默认关闭, 开启后站内链接只更新主要内容 |

### 布局和样式

| 设置       | 配置名                                                    | 说明                                                |
|----------|--------------------------------------------------------|---------------------------------------------------|
| 全屏布局     | `style.fullscreen_layout`                              | 隐藏两侧占位区域, 正文使用全部可用宽度                              |
| 正文最大宽度   | `style.max_width`                                      | 接受 `960px`, `80vw` 等 CSS 长度                       |
| 正文内边距    | `style.content_padding`                                | 同时控制桌面端和移动端正文内边距                                  |
| 正文媒体最大宽度 | `style.media_max_width`                                | 全屏布局中控制图片, 视频和 `figure` 宽度                        |
| 表格铺满正文   | `style.table_full_width`                               | 让正文中的表格宽度为 `100%`                                 |
| 基础字体大小   | `style.font_size`                                      | 接受 `16px`, `1rem` 等 CSS 长度                        |
| 基础行高     | `style.line_height`                                    | 接受 `28px`, `1.75rem` 或 `calc(...)` 等 CSS 长度       |
| 文章段落间距   | `style.post_paragraph_spacing`                         | 控制文章正文段落的上下间距                                     |
| 元信息分隔符   | `style.post_meta_divider`                              | 控制文章时间, 作者和标签等元信息之间的分隔符                           |
| 默认像素风格   | `style.pixel_style`                                    | 使用像素字体和像素图标                                       |
| 自定义字体    | `style.custom_font_enable`                             | 上传字体文件并填写字体内部名称                                   |
| 无序列表标记   | `style.list_marker`                                    | 可选 `-`, `*`, `+`, `>` 或默认标记                       |
| 通用边线     | `style.border_width`, `style.border_style`             | 控制通用边线宽度和样式                                       |
| 表格边线     | `style.table_border_width`, `style.table_border_style` | 控制表格边线宽度和样式                                       |
| 标题分隔线    | `style.title_divider_style`                            | 可选 `solid`, `dashed`, `dotted`, `double` 或 `none` |
| 时间格式     | `style.time_style`                                     | 支持预设格式或 Java 时间格式字符串                              |
| 自定义 CSS  | `style.custom`                                         | 将 CSS 写入页面 `<head>` 中的 `<style>` 标签               |

字体优先级如下:

1. 开启像素风格时使用内置 `Fusion Pixel 12px Prop zh_hans`
2. 未开启像素风格且开启系统字体时使用 `system-ui`
3. 启用自定义字体且未开启系统字体时使用上传的字体
4. 其他情况使用内置 `JetBrains Mono`

访客手动选择的模式, 配色和像素风格会保存在浏览器的 `localStorage` 中. 默认有效期为 24 小时,
可通过 `style.prefer_ttl` 调整，设为 `0` 时永久保存. 偏好过期后会在下次访问时恢复默认值,
已有偏好数据会在升级后的首次访问时开始计算有效期

### 配色设置

| 设置      | 配置名                                  | 说明                          |
|---------|--------------------------------------|-----------------------------|
| 默认配色模式  | `style.default_scheme_mode`          | 可选深色, 浅色或跟随系统               |
| 访客偏好有效期 | `style.prefer_ttl`                   | 模式, 配色和像素风格的保存小时数, `0` 表示永久 |
| 访客配色切换  | `style.color_scheme_switcher_enable` | 在页头显示可用配色列表                 |
| 深色配色    | `style.dark_color_scheme`            | 深色模式使用的内置或自定义配色             |
| 浅色配色    | `style.light_color_scheme`           | 浅色模式使用的内置或自定义配色             |
| 自定义深色名称 | `style.custom_dark`                  | 深色配色选择 `custom` 时填写         |
| 自定义浅色名称 | `style.custom_light`                 | 浅色配色选择 `custom` 时填写         |

访客配色列表会从页面样式表中自动发现 `html[data-theme-color-scheme='name']` 选择器, 列表中的 `default` 用于清除访客选择并恢复主题设置,
因此不要将 `default` 用作自定义配色名称

### 页面设置

| 页面  | 可配置内容                             |
|-----|-----------------------------------|
| 首页  | 公告标题, 公告内容, 社交资料, 置顶图标, 图标位置和文章标签 |
| 文章页 | 文章目录, 目录默认状态和文章标签                 |
| 归档页 | 页面标题和文章标签                         |
| 分类页 | 分类列表标题和分类详情标题                     |
| 标签页 | 标签列表标题和标签详情标题                     |
| 友链页 | 页面标题                              |

文章目录会读取正文中的 `h1` 到 `h4`, `auto` 模式在普通布局中默认展开, 在全屏布局中默认收起, 目录也会根据浏览器宽度和正文右侧空间调整位置

### 社交资料

首页可以显示以下资料:

- Email
- GitHub
- Discord
- Telegram
- Facebook
- Instagram
- X
- RSS

### 备案信息

页脚支持 ICP 备案号, ICP 跳转链接, 公安备案号和公安备案跳转链接

## 内置配色

| 名称          | 背景色       | 前景色       | 强调色       |
|-------------|-----------|-----------|-----------|
| `day`       | `#f4f4f4` | `#3e3e3e` | `#003e8a` |
| `night`     | `#101216` | `#8b949e` | `#6ca4f8` |
| `niello`    | `#1a170f` | `#eceae5` | `#eec35e` |
| `matrix`    | `#000000` | `#4eee85` | `#4eee85` |
| `ink`       | `#121212` | `#c3c3c3` | `#ffffff` |
| `paper`     | `#ffffff` | `#1b1b1b` | `#000000` |
| `hopbush`   | `#fff6f6` | `#462d2d` | `#cc6099` |
| `pistachio` | `#1d2021` | `#ebdbb2` | `#8ec07c` |
| `blue`      | `#153489` | `#eceae5` | `#5ea5ee` |
| `vanilla`   | `#fff4f2` | `#424140` | `#8f6a5e` |
| `studio`    | `#f7f4ff` | `#403352` | `#6f49ab` |
| `blood`     | `#221f29` | `#ffffff` | `#ff6266` |

`day` 和 `night` 对标签, 元信息, 边框, 菜单和页头使用了额外的语义颜色, 其他配色默认从前景色和强调色派生这些颜色

`ink` 使用 `#5ac8fa` 链接色, `#c1c1c1` 弱化色和 `#1f1f1f` 行内代码背景;
`paper` 使用 `#406ed2` 链接色, `#595959` 弱化色和 `#ebebeb` 行内代码背景

## 自定义 CSS

在主题设置的 `全局样式 -> 自定义样式` 中填写原始 CSS, 自定义内容在主题主样式之后加载, 可以覆盖内置规则

### 新增自定义配色

下面的示例增加名为 `forest` 的配色:

```css
html[-data-theme-color-scheme='forest'] {
    --color-theme-background: #0f1a14;
    --color-theme-foreground: #c7d8cc;
    --color-theme-accent: #68d391;

    /* Optional semantic colors */
    --color-theme-tag: #9ae6b4;
    --color-theme-meta: #81a88d;
    --color-theme-framed: #48bb78;
    --color-theme-menu: #c7d8cc;
    --color-theme-header: #68d391;
}
```

保存后可以使用以下任一方式启用:

1. 在 `深色配色方案` 或 `浅色配色方案` 中选择 `custom`, 再填写名称 `forest`
2. 开启 `启用访客配色切换`, 然后由访客在页头选择 `forest`

### 覆盖内置配色

直接使用内置配色名称即可覆盖对应变量:

```css
html[-data-theme-color-scheme='matrix'] {
    --color-theme-background: #07130b;
    --color-theme-foreground: #7dff9b;
    --color-theme-accent: #39ff68;
}
```

### 常用颜色变量

| 变量                               | 用途            |
|----------------------------------|---------------|
| `--color-theme-background`       | 页面背景          |
| `--color-theme-foreground`       | 正文和主要文本       |
| `--color-theme-accent`           | 链接, 按钮和主要强调元素 |
| `--color-theme-tag`              | 文章标签          |
| `--color-theme-title`            | 文章标题          |
| `--color-theme-meta`             | 时间, 作者和其他元信息  |
| `--color-theme-framed`           | 公告框和强调边框      |
| `--color-theme-menu`             | 导航菜单          |
| `--color-theme-header`           | 页头文字和边框       |
| `--color-theme-code-text`        | 行内代码和代码块文字    |
| `--color-theme-code-background`  | 行内代码背景        |
| `--color-theme-link`             | 链接            |
| `--color-theme-post-link`        | 文章和页面正文链接     |
| `--color-theme-muted`            | 次要文字          |
| `--color-theme-foreground-muted` | 弱化前景色         |
| `--color-theme-accent-muted`     | 弱化强调色         |
| `--color-theme-accent-subtle`    | 低对比度强调色       |
| `--color-theme-surface`          | 代码块和组件表面      |
| `--color-theme-surface-hover`    | 组件悬停表面        |
| `--color-theme-border-muted`     | 低对比度边框        |
| `--color-theme-highlight`        | 高亮文本背景        |
| `--color-theme-overlay`          | 遮罩层           |
| `--color-theme-scrollbar`        | 滚动条           |

派生颜色使用 CSS `color-mix()`, 自定义配色通常只需要设置背景色, 前景色和强调色, 其余变量可以按需要覆盖

### 常用布局变量

| 变量                                         | 默认值                                     |
|--------------------------------------------|-----------------------------------------|
| `--size-theme-font`                        | `1rem`                                  |
| `--height-theme-line`                      | `calc(var(--size-theme-font) * 1.75)`   |
| `--spacing-theme-post-paragraph`           | `calc(var(--size-theme-font) * 1.25)`   |
| `--content-theme-post-meta-divider`        | `"::"`                                  |
| `--family-theme-font`                      | `'JetBrains Mono'`                      |
| `--list-theme-type`                        | `disc`                                  |
| `--width-theme-border`                     | `calc(var(--size-theme-font) * 0.125)`  |
| `--width-theme-table-border`               | `calc(var(--size-theme-font) * 0.0625)` |
| `--width-theme-media-max`                  | `60%`                                   |
| `--spacing-theme-container-padding`        | `calc(var(--size-theme-font) * 2.5)`    |
| `--spacing-theme-container-padding-mobile` | `calc(var(--size-theme-font) * 1.25)`   |
| `--style-theme-border`                     | `solid`                                 |
| `--style-theme-table-border`               | `dashed`                                |
| `--style-theme-title-divider`              | `dashed`                                |
| `--radius-theme-border`                    | `0`                                     |
| `--text-decoration-theme-link`             | `none`                                  |
| `--text-decoration-theme-post-link`        | `var(--text-decoration-theme-link)`     |
| `--weight-theme-inline-code`               | `inherit`                               |
| `--lig-theme-font`                         | `none`                                  |
| `--width-theme-scrollbar`                  | `thin`                                  |

修改特定配色下的字体:

```css
html[-data-theme-color-scheme='matrix'] {
    --family-theme-font: system-ui;
}
```

修改全局行高:

```css
:root {
    --height-theme-line: calc(var(--size-theme-font) * 1.7);
}
```

## PJAX

PJAX 默认关闭, 开启后站内 `a[data-pjax]` 链接会更新以下区域:

- `<head>` 中的 `<title>`
- `.content`
- `.ex-pjax`

预留了一个 `.ex-pjax` 类名, 可以通过将注入的标签设置 `class="ex-pjax"` 来使用 PJAX, 也可以直接使用 `data-pjax` 属性

```html

<div class="ex-pjax">
    Dynamic content
</div>
```

OR:

```html

<div data-pjax>
    Dynamic content
</div>
```

如果要注入 `<script>` 或 `<link rel="stylesheet">`, 根据插入的位置需要为标签添加一些属性才能保证行为正常

- `<head>`: 重新执行所有请求页面新插入的无 `data-no-pjax` 属性的 `<script>` 和 `<link rel="stylesheet">`
- `<footer>`: 重新执行有 `data-pjax` 属性的 `<script>` 和 `<link rel="stylesheet">`
- `.content`: 重新执行有 `data-pjax` 属性的 `<script>` 和 `<link rel="stylesheet">`

设置 `data-no-pjax` 属性, 可以防止被 PJAX 处理

### 已知的问题

动态注入 JS 的时候可能会出现一些问题

- <del>highlightjs 插件的 _复制按扭_ 数量会随页面切换增加</del> (此插件目前已过时)

## 开发和构建

### 环境

项目使用原生 ES 模块, 用 `esbuild` 来构建, 使用 `pnpm` 管理依赖

确保已安装 `nodejs`

### 使用 Make

```shell
make
```

其他目标:

```shell
make install
make build
make test
make clean
```

`make test` 会构建主题, 清理旧的测试目录并将压缩包解压到 `dist/theme-terminal-ez`

### 使用 pnpm

```shell
corepack enable
pnpm install --frozen-lockfile
pnpm build
```

构建产物位于:

```text
dist/theme-terminal-ez-<version>.zip
```

## 原主题

- [Terminal](https://github.com/wan92hen/theme-terminal)
- [Hugo Terminal](https://github.com/panr/hugo-theme-terminal)
