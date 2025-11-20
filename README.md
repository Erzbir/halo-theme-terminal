# Terminal

<img src="https://raw.githubusercontent.com/Erzbir/halo-theme-terminal/refs/heads/main/preview/scheme.png" alt="scheme">

前往: https://erzbir.com 查看

## 功能

1. PJAX
2. 样式自定义
3. 配色切换
4. 深色/浅色模式 
5. 页面自定义 
6. 文章目录 
7. 社交资料 
8. 子菜单 
9. 像素化

## 关于自定义 CSS

目前只有原始 CSS 输入, 在样式设置中可以填入原始 CSS, 主题会直接将这段 CSS 插入到 head

### 新增自定义主题配色

比如这里增加一个名字叫 `default` 的配色:

```css
html[theme-color-scheme='default'] {
    /* 页面背景色 */
    --color-theme-background: #000000;
    /* 页面主要文本颜色 */
    --color-theme-foreground: #4eee85;
    /* 主要强调色，例如按钮、链接等 */
    --color-theme-accent: #4eee85;
    /* 标签文本颜色 */
    --color-theme-tag: #4eee85;
    /* 文章标题颜色 */
    --color-theme-title: #4eee85;
    /* 元信息(如时间, 作者等) 颜色 */
    --color-theme-meta: #4eee85;
    /* 有边框的元素颜色, 如卡片边框 */
    --color-theme-framed: #4eee85;
    /* 多级菜单颜色 */
    --color-theme-menu: #4eee85;
    /* 菜单文字颜色 */
    --color-theme-header: #4eee85;
}
```

将这段 CSS 代码填入 `自定义样式` 后, 在 `深色/浅色配色方案` 的下拉框中选择 `custom`, 并填入配色名: `default` 即可

也可以通过直接覆盖的方式来修改主题颜色, 在自定义样式的代码框中填入:

```css
html[theme-color-scheme='day'] {
    --color-theme-background: #000000;
    --color-theme-foreground: #4eee85;
    --color-theme-accent: #4eee85;
    --color-theme-tag: #4eee85;
    --color-theme-title: #4eee85;
    --color-theme-meta: #4eee85;
    --color-theme-framed: #4eee85;
    --color-theme-menu: #4eee85;
    --color-theme-header: #4eee85;
}
```

可覆盖名为 `day` 的配色方案

### 覆盖其他变量

如果要覆盖其他变量, 需要查看主题定义的 `css` 并根据需要来覆盖, 一些全局变量在 `:root` 中定义:

```css
:root {
    --color-theme-background: ;
    --color-theme-foreground: ;
    --color-theme-accent: ;
    --color-theme-tag: ;
    --color-theme-title: ;
    --color-theme-meta: ;
    --color-theme-framed: ;
    --color-theme-menu: ;
    --color-theme-header: ;
    --color-theme-scrollbar: rgba(134, 134, 134, 0.45) rgba(255, 255, 255, 0);
    /* 无序列表前缀修饰符号 */
    --list-theme-marker: "►";
    /* 基本字体大小. 所有元素大小都根据此大小变化 */
    --size-theme-font: 1rem;
    --height-theme-line: calc(var(--size-theme-font) * 1.6);
    --width-theme-scrollbar: thin;
    --width-theme-border: calc(var(--size-theme-font) * 0.125);
    /* 边框样式 */
    --style-theme-border: solid;
    /* 文章标题分界线样式, 与边框样式填写逻辑一样 */
    --style-theme-title-divider: dashed;
    --radius-theme-border: 0;
    --family-theme-font: 'JetBrains Mono';
    /* 在字体不可用时尝试使用系统的默认字体 */
    --family-theme-fallback-font: -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Oxygen,
    Ubuntu, Cantarell, 'open sans', 'helvetica neue', Arial, 'Noto Sans',
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    /* 字体连字 */
    --lig-theme-font: none;
}
```

比如这里要让某个配色下面的字体使用 MacOS 默认的字体:

```css
html[theme-color-scheme='matrix'] {
    --family-theme-font: '-apple-system';
}
```

自定义行高:
```css
html {
    --height-theme-line: 25px;
}
```

## 关于 PJAX

**目前 PJAX 功能需要手动开启**

### 代码注入需注意的事项

预留了一个 `.ex-pjax` 类名, 可以通过将注入的标签设置 `class="ex-pjax"` 来使用 PJAX, 也可以直接使用 `data-pjax` 属性

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


## 原主题

- [Terminal](https://github.com/wan92hen/theme-terminal)
- [Hugo Terminal](https://github.com/panr/hugo-theme-terminal)
