webpackJsonp([2],{C3fl:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=o("Dd8w"),s=o.n(e),i=o("NYxO"),a={name:"NotebookList",data:function(){return{msg:"笔记本列表"}},created:function(){this.__init()},computed:s()({},Object(i.c)(["notebooks"])),methods:s()({},Object(i.b)(["getNotebooks_actions","addNotebook_actions","updateNotebook_actions","deleteNotebook_actions"]),{__init:function(){this.getNotebooks_actions()},onCreate:function(){var t=this;this.$prompt("输入新笔记本标题","创建笔记本",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^.{1,30}$/,inputErrorMessage:"标题不能为空，且不超过30个字符"}).then(function(n){var o=n.value;return t.addNotebook_actions({title:o})}).then(function(n){t.$message.success(n.msg)})},onEdit:function(t){var n=this;this.$prompt("修改笔记本标题","修改笔记本",{confirmButtonText:"确定",cancelButtonText:"取消",inputValue:t.title,inputPattern:/^.{1,30}$/,inputErrorMessage:"标题不能为空，且不超过30个字符"}).then(function(o){var e=o.value;return n.updateNotebook_actions({notebookId:t.id,title:e})}).then(function(t){n.$message.success(t.msg)})},onDelete:function(t){var n=this;this.$confirm("确定要删除当前笔记本吗?","删除笔记本",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(o){return n.deleteNotebook_actions({notebookId:t.id})}).then(function(t){n.$message.success(t.msg)})}})},c={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"detail",attrs:{id:"notebook-list"}},[o("header",[o("a",{staticClass:"btn",attrs:{href:"#"},on:{click:function(n){n.preventDefault(),t.onCreate(n)}}},[o("i",{staticClass:"iconfont icon-plus"}),t._v(" 新建笔记本")])]),t._v(" "),o("main",[o("div",{staticClass:"layout"},[o("h3",[t._v("笔记本列表("+t._s(t.notebooks.length)+")")]),t._v(" "),t.notebooks.length?o("div",{staticClass:"book-list"},t._l(t.notebooks,function(n,e){return o("router-link",{key:e,staticClass:"notebook",attrs:{to:"/note?notebookId="+n.id}},[o("div",[o("span",{staticClass:"iconfont icon-notebook"}),t._v(" "+t._s(n.title)+" \n                          "),o("span",[t._v(t._s(n.noteCounts))]),t._v(" "),o("span",{staticClass:"action",on:{click:function(o){o.stopPropagation(),o.preventDefault(),t.onDelete(n)}}},[t._v("删除")]),t._v(" "),o("span",{staticClass:"action",on:{click:function(o){o.stopPropagation(),o.preventDefault(),t.onEdit(n)}}},[t._v("编辑")]),t._v(" "),o("span",{staticClass:"date"},[t._v(t._s(n.createdAtFriendly))])])])})):o("div",{staticClass:"noneBooks"},[t._v(" 请添加笔记本 ")])])])])},staticRenderFns:[]};var r=o("VU/8")(a,c,!1,function(t){o("sJpK")},"data-v-2188f56e",null);n.default=r.exports},sJpK:function(t,n){}});
//# sourceMappingURL=2.60a0142d29a272962fe6.js.map