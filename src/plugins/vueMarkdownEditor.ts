import VMdEditor from "@kangc/v-md-editor/lib/codemirror-editor";
import "@kangc/v-md-editor/lib/style/codemirror-editor.css";

// vuepressTheme
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

// highlightjs
import Prism from "prismjs";

// codemirror 编辑器的相关资源
import Codemirror from "codemirror";
// mode
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/vue/vue";
// edit
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
// placeholder
import "codemirror/addon/display/placeholder";
// active-line
import "codemirror/addon/selection/active-line";
// scrollbar
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/scroll/simplescrollbars.css";
// style
import "codemirror/lib/codemirror.css";
// mermaid
import createMermaidPlugin from "@kangc/v-md-editor/lib/plugins/mermaid/cdn";
import "@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css";
// emoji
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
// LineNumber
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
// Copy Code
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
// Highlight Lines
import createHighlightLinesPlugin from "@kangc/v-md-editor/lib/plugins/highlight-lines/index";
import "@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css";
// todolist
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";

VMdEditor.Codemirror = Codemirror;
export default VMdEditor.use(vuepressTheme, {
  Prism,
})
  .use(createMermaidPlugin())
  .use(createEmojiPlugin())
  .use(createLineNumbertPlugin())
  .use(createCopyCodePlugin())
  .use(createHighlightLinesPlugin())
  .use(createTodoListPlugin());
