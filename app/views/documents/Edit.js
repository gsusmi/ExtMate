ExtMVC.registerView('documents', 'edit', {
  xtype        : 'panel',
  registerXType: 'document',
  title        : "New Document",
  closable     : true,
  autoScroll   : true,
  
  constructor: function(config) {
    config = config || {};
    
    /**
     * @property editor
     * @type Ext.Panel
     * The canvas editor bound to this panel
     */
    this.editor =  ExtMVC.buildView("documents", "editor", {
      listeners: {
        scope         : this,
        'cursor-moved': this.updateCursorLocation
      }
    });
    
    Ext.applyIf(config, {
      bbar  : this.buildBottomToolbar(),
      layout: 'fit',
      items : [
        this.editor
      ]
    });
    
    Ext.Panel.prototype.constructor.call(this, config);
    
    this.on('render', this.loadFakeRecord, this);
    
    this.relayEvents(this.editor, ['copy', 'paste', 'scroll']);
  },
  
  /**
   * Loads a document into this panel
   * @param {ExtMate.models.Document} instance The document to load
   */
  loadRecord: function(instance) {
    /**
     * @property instance
     * @type ExtMate.models.Document
     * The currently loaded document
     */
    this.instance = instance;
    
    this.editor.bind(instance);
  },
  
  /**
   * Updates the cursor status text
   * @param {ExtMate.models.Cursor} cursor The cursor
   */
  updateCursorLocation: function(cursor) {
    this.lineNumber.setText("Line: " + cursor.get('line'));
    this.columnNumber.setText("Column: " + cursor.get('column'));
  },
    
  loadFakeRecord: function() {
    var doc = ExtMVC.buildModel("Document", {
      body: 
        "ExtJS Text Editor\n" +
        "About:\n" +
        "\n" +
        "* <canvas> based\n" +
        "* Uses ExtJS MVC\n" +
        "* Aims to emulate E (http://e-texteditor.com)\n" +
        "* < 1KLOC\n" +
        "\n" +
        "* Select + multiple select\n" +
        "* Multiple cursor support (ctrl + click)\n" +
        "* Copy/Paste + paste to multiple"
    });
    
    this.loadRecord(doc);
  },
  
  buildBottomToolbar: function() {
    /**
     * @property lineNumber
     * @type Ext.Toolbar.TextItem
     * Displays the current line number
     */
    this.lineNumber = new Ext.Toolbar.TextItem({
      text: "Line: 1"
    });
    
    /**
     * @property columnNumber
     * @type Ext.Toolbar.TextItem
     * Displays the current column number
     */
    this.columnNumber = new Ext.Toolbar.TextItem({
      text: "Column 1"
    });
    
    /**
     * @property languageCombo
     * @type Ext.form.ComboBox
     * Allows the user to select which language the file is int
     */
    this.languageCombo = new Ext.form.ComboBox({
      name          : 'language',
      mode          : 'local',
      editable      : false,
      forceSelection: true,
      triggerAction : 'all',
      displayField  : 'name',
      valueField    : 'id',
      value         : 'JavaScript',
      
      store: new Ext.data.JsonStore({
        fields : ['name', 'id'],
        data   : [
          {
            name : 'JavaScript',
            id   : 'js'
          },
          {
            name : 'HTML',
            id   : 'html'
          },
          {
            name : 'CSS',
            id   : 'css'
          }
        ]
      })
    });
    
    return new Ext.Toolbar({
      items: [
        this.lineNumber,
        ' ',
        this.columnNumber,
        '-',
        this.languageCombo
      ]
    });
  }
});