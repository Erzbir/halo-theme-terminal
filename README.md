# Terminal-EZ

一款简洁, 复古的 Terminal 风格 Halo 主题

<a href="https://raw.githubusercontent.com/Erzbir/halo-theme-terminal/refs/heads/main/screenshot.png">预览图</a>

## 使用说明

### 通用设置

- `时间格式` 提供常用格式, 也可以填写自定义 Java 时间格式
- `访客偏好有效期` 控制外观, 配色和像素风格的保存时间, 默认为 24 小时, 设为 `0` 时永久保存
- `PJAX` 默认关闭; 开启后支持局部刷新, 如果遇到插件兼容问题可以将其关闭

### 页头功能按钮

页头默认包含搜索, 配色切换, 外观切换和像素化按钮. 可以在 `页头 -> 功能按钮` 中添加, 删除或拖动按钮来控制显示顺序.

- 搜索按钮仅在搜索组件可用时显示
- 内置按钮可以分别设置普通图标和像素风格图标, 留空时使用主题内置图标
- 自定义功能按钮需要填写名称, `onclick` JavaScript 和图标; 只应填写可信任的 JavaScript

外观切换顺序为 `浅色 -> 深色 -> 跟随系统`. 切换外观时会清除访客单独选择的配色, 重新使用当前外观对应的主题方案.

### 配色

在 `配色` 中分别选择浅色和深色方案. 默认外观设为“跟随系统”时, 主题会根据访客的系统设置自动切换.

添加自定义配色:

1. 在 `配色 -> 自定义方案` 中添加一项并填写唯一 ID, 背景色, 主文本色和基础强调色.
2. 如需更精细的效果, 开启高级颜色设置后配置文字, 链接, 导航, 控件, 边框和代码颜色.
3. 在浅色方案或深色方案中选择 `custom`, 再填写自定义方案的 ID.
4. 如需允许访客自由选择配色, 在 `页头 -> 功能按钮` 中保留或添加配色切换按钮.

### 字体与像素风格

主题内置 JetBrains Mono, Hack 和 Fira Code, 也可以选择访客的系统字体. 如需加载自己的字体, 开启 `字体与排版 -> 启用自定义字体`, 再按优先级添加字体文件.

每项自定义字体可以填写字体名称, PostScript Name, 字体文件和格式. 浏览器会优先匹配访客设备中的本地字体, 未找到时再加载字体文件. 高级设置可配置字重, 样式, Unicode 范围, 显示策略和可变字体轴等属性.

开启像素风格后, 主题会优先使用内置像素字体和像素图标.

### 布局与全局样式

- `全屏布局` 会让正文占满可用宽度, 并可单独限制正文图片, 视频和 `figure` 的最大宽度
- `正文区域最大宽度`, `正文区域内边距` 和 `表格宽度铺满父元素` 用于调整内容区域
- `基础字体大小`, `基础行高` 和 `文章段落间距` 用于调整阅读密度
- `无序列表标记`, 边线样式, 边线宽度和标题分隔线用于统一全站视觉风格
- `元信息分隔符` 用于分隔文章时间, 作者和标签等信息

### 页面设置

| 页面  | 可配置内容                             |
|-----|-----------------------------------|
| 首页  | 公告标题, 公告内容, 社交资料, 置顶图标, 图标位置和文章标签 |
| 文章页 | 文章目录, 目录默认状态和文章标签                 |
| 归档页 | 页面标题, 文章标签, 分页和年份展开模式             |
| 分类页 | 分类列表标题和分类详情标题                     |
| 标签页 | 标签列表标题和标签详情标题                     |
| 友链页 | 页面标题                              |

文章目录会读取正文中的 `h1` 到 `h4`. “自动”模式在普通布局中默认展开, 在全屏布局中默认收起; 目录也会根据浏览器宽度和正文右侧空间调整位置.

### 插件与扩展页面

| 功能    | 使用条件                             |
|-------|----------------------------------|
| 友链    | 安装并启用友链插件                        |
| 友链申请  | 使用友链插件 `>=2.3.0`, 并在插件设置中开启友链申请  |
| 朋友圈   | 安装并启用朋友圈插件                       |
| 瞬间    | 安装并启用瞬间插件                        |
| 项目作品集 | 安装并启用作品集插件                       |
| 搜索    | 安装并启用搜索组件, 并在页头功能按钮中添加搜索按钮       |
| 评论    | 安装并启用评论插件, 同时在 Halo 中开启对应内容的评论功能 |

安装插件后, 对应页面会自动使用主题提供的样式和页面模板.

### 社交资料与备案

在 `社交资料` 中可以添加任意社交资料, 每项资料可配置名称, 链接, 普通图标和像素风格图标; 链接支持 `http://`, `https://`, `mailto:` 和 `tel:`.

添加后还需要开启 `首页 -> 展示社交资料` 才会在首页显示. RSS 可单独开启.

页脚支持 ICP 备案号, ICP 跳转链接, 公安备案号和公安备案跳转链接.

### 内置配色

| 名称          | 背景色       | 主文本色      | 基础强调色     |
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

### 自定义 CSS

在主题设置的 `高级设置 -> 自定义 CSS` 中填写原始 CSS. 自定义内容在主题主样式之后加载, 可以覆盖内置规则.

 直接使用内置配色名称即可覆盖对应变量:

```css
html[data-theme-color-scheme='matrix'] {
    --color-theme-background: #07130b;
    --color-theme-text: #7dff9b;
    --color-theme-accent: #39ff68;
}
```

修改特定配色下的字体:

```css
html[data-theme-color-scheme='matrix'] {
    --family-theme-font: system-ui;
}
```

### CSS 变量

#### 常用颜色变量

| 变量                              | 用途                  |
|---------------------------------|---------------------|
| `--color-theme-background`      | 页面和基础背景             |
| `--color-theme-text`            | 正文和主要文字             |
| `--color-theme-text-secondary`  | 摘要, 插件等辅助文字         |
| `--color-theme-text-muted`      | 时间, 作者, 占位符等弱化文字    |
| `--color-theme-text-inverse`    | 强调色填充背景上的文字         |
| `--color-theme-accent`          | 基础强调色, 用于填充和焦点等强调基础 |
| `--color-theme-text-accent`     | 标题, 按钮文字等强调文字       |
| `--color-theme-text-label`      | 标签和技术标记文字           |
| `--color-theme-text-link`       | 普通链接文字              |
| `--color-theme-accent-muted`    | 中等强度强调色             |
| `--color-theme-accent-subtle`   | 低强度强调色              |
| `--color-theme-navigation`      | 主导航文字               |
| `--color-theme-control`         | 页头控件和 Logo          |
| `--color-theme-surface`         | 代码块和组件表面            |
| `--color-theme-surface-strong`  | 对比度更高的代码和控件表面       |
| `--color-theme-border`          | 默认边框                |
| `--color-theme-border-muted`    | 低对比度边框              |
| `--color-theme-border-accent`   | 交互元素和内容强调边框         |
| `--color-theme-border-emphasis` | 公告框, 作品卡片等强调边框      |
| `--color-theme-selection`       | 选中文字的背景             |
| `--color-theme-overlay`         | 模态遮罩层               |
| `--color-theme-scrollbar`       | 滚动条                 |
| `--color-theme-code-text`       | 行内代码和代码块文字          |
| `--color-theme-code-background` | 行内代码背景              |
| `--color-theme-caret`           | 打字效果动态光标            |

派生颜色使用 CSS `color-mix()`. 自定义配色通常只需要设置背景色, 主文本色和基础强调色;
相同语义在所有配色中保持一致, 只有确实需要不同视觉层级时才覆盖其他语义变量.

#### 常用布局变量

| 变量                                         | 默认值                                     |
|--------------------------------------------|-----------------------------------------|
| `--size-theme-font`                        | `1rem`                                  |
| `--height-theme-line`                      | `calc(var(--size-theme-font) * 1.75)`   |
| `--spacing-theme-post-paragraph`           | `calc(var(--size-theme-font) * 1.25)`   |
| `--content-theme-post-meta-divider`        | `"::"`                                  |
| `--family-theme-font`                      | `'JetBrains Mono'`                      |
| `--list-theme-style`                       | `disc`                                  |
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

### PJAX

PJAX 默认关闭, 开启后站内 `a[data-pjax]` 链接会更新以下区域:

- `<head>` 中的 `<title>`
- `.content`
- `.ex-pjax`

`a[data-pjax]` 用于触发 PJAX 导航. `.ex-pjax` 是额外的内容替换区域, 需要确保当前页面和目标页面都存在对应元素.

```html

<div class="ex-pjax">
    Dynamic content
</div>
```

如果要注入 `<script>` 或 `<link rel="stylesheet">`, 根据插入的位置需要为标签添加一些属性才能保证行为正常

- `<head>`: 重新执行所有请求页面新插入的无 `data-no-pjax` 属性的 `<script>` 和 `<link rel="stylesheet">`
- `<footer>`: 重新执行有 `data-pjax` 属性的 `<script>` 和 `<link rel="stylesheet">`
- `.content`: 重新执行有 `data-pjax` 属性的 `<script>`

设置 `data-no-pjax` 属性, 可以防止被 PJAX 处理

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
