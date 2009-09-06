ExtMVC.App.define({name:"MyApp",launch:function(){Ext.QuickTips.init();this.initializeKeyMap();this.menu=ExtMVC.buildView("layout","menu",{region:"west",width:215,split:true,listeners:{scope:this,click:function(B){if(!B.hasChildNodes()){var A=B.attributes;ExtMVC.dispatch("documents","edit",[A.id])}}}});this.main=new Ext.TabPanel({region:"center",plain:true,cls:"mainPanel",enableTabScroll:true});this.viewport=new Ext.Viewport({layout:"fit",items:[{layout:"border",items:[this.menu,this.main],tbar:ExtMVC.buildView("layout","toolbar")}]});this.fireEvent("launched");ExtMVC.dispatch("index","index");Ext.get("loading").remove();Ext.get("loading-mask").fadeOut({remove:true})},initializeKeyMap:function(A){this.keymap=new Ext.KeyMap(document,[{key:"n",ctrl:true,fn:ExtMVC.dispatch.createDelegate(ExtMVC,["documents","build"]),stopEvent:true}])}});ExtMVC.router.Router.defineRoutes=function(A){A.connect(":controller/:action");A.connect(":controller/:action/:id");A.root({controller:"index",action:"index"})};ExtMVC.registerModel("Document",{fields:[{name:"id",type:"int"},{name:"name",type:"string"},{name:"body",type:"string"}]});ExtMVC.registerController("application",{extend:"controller"});ExtMVC.registerController("index",{index:function(){Ext.each(["IndexController.js","ExtMate.css"],function(A){this.render("documents","edit",{title:A})},this)}});ExtMVC.registerController("documents",{build:function(){this.render("new")},edit:function(B){var A=B.split("-");this.render("edit",{title:A[A.length-1]})}});ExtMVC.registerView("layout","menu",{xtype:"treepanel",collapsible:true,constructor:function(A){A=A||{};Ext.applyIf(A,{cls:"file-menu",root:{text:"extmate",id:"menu",nodeType:"async",expanded:true,children:[{text:"app",expanded:true,children:[{text:"App.js",leaf:true,id:"app-App.js"},{text:"controllers",children:[{text:"ApplicationController.js",leaf:true,id:"app-controllers-ApplicationController.js"},{text:"IndexController.js",leaf:true,id:"app-controllers-IndexController.js"}]},{text:"models",children:[{text:"Document.js",leaf:true,id:"app-models-Document.js"}]},{text:"views",children:[{text:"index",children:[{text:"Index.js",leaf:true}]},{text:"layout",children:[{text:"Menu.js",leaf:true},{text:"Toolbar.js",leaf:true}]}]}]},{text:"config",children:[]},{text:"lib",children:[]},{text:"public",children:[]},{text:"script",children:[]},{text:"spec",children:[]},{text:"vendor",children:[]}]},bbar:this.buildBottomToolbar(),autoScroll:true});Ext.tree.TreePanel.prototype.constructor.call(this,A)},buildBottomToolbar:function(){this.newFileButton=new Ext.Button({text:"",iconCls:"new-file",scope:this,handler:ExtMVC.dispatch.createDelegate(ExtMVC,["documents","build"]),tooltip:"Create a new file"});this.newDirectoryButton=new Ext.Button({text:"",iconCls:"new-directory",scope:this,handler:this.onNewDirectory,tooltip:"Create a new directory"});return new Ext.Toolbar({items:[this.newFileButton,"-",this.newDirectoryButton]})}});ExtMVC.registerView("layout","toolbar",{xtype:"toolbar",constructor:function(A){A=A||{};Ext.applyIf(A,{items:[this.buildFileMenu(),this.buildEditMenu()]});Ext.Toolbar.prototype.constructor.call(this,A)},buildFileMenu:function(){return{text:"File",menu:{items:[{text:"New File",iconCls:"new-file",scope:this,handler:ExtMVC.dispatch.createDelegate(ExtMVC,["documents","build"])},{text:"Open Recent",menu:{items:[{iconCls:"file",text:"ApplicationController.js"},{iconCls:"file",text:"Document.js"}]}},{text:"Save",scope:this,iconCls:"save-file",handler:function(){console.log("save")}}]}}},buildEditMenu:function(){return{text:"Edit",menu:{items:[{text:"Find",scope:this,iconCls:"find",handler:function(){console.log("find")}}]}}}});ExtMVC.registerView("index","index",{xtype:"panel",initComponent:function(){Ext.applyIf(this,{title:"Welcome to Ext MVC",html:"This is the default template, which is found in app/views/index/Index.js.  This is being displayed because your config/routes.js file has a map.root setting telling it to use the Index view of the IndexController"});Ext.Panel.prototype.initComponent.apply(this,arguments)}});ExtMVC.registerView("documents","edit",{xtype:"panel",registerXType:"document",title:"New Document",closable:true,constructor:function(A){A=A||{};Ext.applyIf(A,{bbar:this.buildBottomToolbar()});Ext.Panel.prototype.constructor.call(this,A)},buildBottomToolbar:function(){this.lineNumber=new Ext.Toolbar.TextItem({text:"Line: 24"});this.columnNumber=new Ext.Toolbar.TextItem({text:"Column 18"});this.languageCombo=new Ext.form.ComboBox({name:"language",mode:"local",editable:false,forceSelection:true,triggerAction:"all",displayField:"name",valueField:"id",value:"JavaScript",store:new Ext.data.JsonStore({fields:["name","id"],data:[{name:"JavaScript",id:"js"},{name:"HTML",id:"html"},{name:"CSS",id:"css"}]})});return new Ext.Toolbar({items:[this.lineNumber," ",this.columnNumber,"-",this.languageCombo]})}});ExtMVC.registerView("documents","new",{xtype:"formwindow",title:"New File",width:300,height:110,layout:"fit",id:"new_file",closeAction:"close",defaultButton:"new-file-input",buildForm:function(){return new Ext.form.FormPanel({labelWidth:80,bodyStyle:"padding: 5px",items:[{fieldLabel:"Filename",xtype:"textfield",name:"filename",anchor:"-20",id:"new-file-input"}]})}});