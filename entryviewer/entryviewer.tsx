import Entrys from "./components/entrys/entrys";
import store from "./store/entryviewerstore";
import attachStorageFunctions from "../shared/storagefunctions";
import ImageLinkEditor from "./components/imagelinkedit/imagelinkedit";
import TagEditor from "./components/tageditor/tageditor";
import ButtonSideBar from "./components/buttonsidebar/buttonsidebar";
import QueryBar from "./components/querybar/querybar";

// TEMPORARY
import EntryEditor from "./components/entryeditor/entryeditor";

import "./entryviewer.less";

/* EntryViewerMain() */
class EntryViewerMain extends React.Component
{
  state:{
    currentEditEntry:HistoryEntry

    tagEditEntry:HistoryEntry
    tagEditShow:boolean

    editorShown:boolean
    imageEditorShown:boolean
    cloakEnabled:boolean
  }

  thetageditor:ReactRef<typeof TagEditor>

  constructor(props:any)
  {
    super(props);
    this.loadEditor=this.loadEditor.bind(this);
    this.closeEditor=this.closeEditor.bind(this);
    this.toggleImageEditor=this.toggleImageEditor.bind(this);
    this.loadTagEditor=this.loadTagEditor.bind(this);
    this.closeTagEditor=this.closeTagEditor.bind(this);

    this.state={
      currentEditEntry:{
        id:0,
        name:"",
        group:"",
        type:"OTHER",
        image:"",
        link:"",
        date:"",
        tags:[]
      },

      tagEditEntry:null,
      tagEditShow:false,

      editorShown:false,
      imageEditorShown:false,
      cloakEnabled:false
    };

    this.thetageditor=React.createRef();
  }

  // load the editor with a history entry
  loadEditor(entry:HistoryEntry):void
  {
    if (!entry.image)
    {
      entry.image="";
    }

    this.toggleCloak();
    this.setState({
      currentEditEntry:entry,
      editorShown:true
    });
  }

  // close the editor without changes
  closeEditor():void
  {
    this.toggleCloak(false);
    this.setState({editorShown:false});
  }

  // toggle the image editor or set it to the given value
  toggleImageEditor(editorOn?:boolean):void
  {
    this.toggleCloak(editorOn);
    this.setState({imageEditorShown:editorOn==undefined?!this.state.imageEditorShown:editorOn});
  }

  // enable/disable or set the cloak
  toggleCloak(cloakOn?:boolean):void
  {
    this.setState({cloakEnabled:cloakOn==undefined?!this.state.cloakEnabled:cloakOn});
  }

  // load the tag editor
  loadTagEditor(entry:HistoryEntry):void
  {
    this.setState({
      cloakEnabled:true,
      tagEditShow:true,
      tagEditEntry:entry
    },()=>{
      this.thetageditor.current.loadEntry();
    });
  }

  // close the tag editor
  closeTagEditor():void
  {
    this.setState({
      tagEditShow:false,
      cloakEnabled:false
    });
  }

  render()
  {
    return <>
      <div className={`content-window ${this.state.cloakEnabled?"cloaked":""}`}>
        <div className="content">
          <QueryBar/>
          <Entrys loadEditor={this.loadEditor} loadTagEditor={this.loadTagEditor}/>
          <EntryEditor shown={this.state.editorShown} loadEntry={this.state.currentEditEntry}
            closeEditor={this.closeEditor}/>
          <ImageLinkEditor showing={this.state.imageEditorShown} parentCloseEditor={this.toggleImageEditor}/>
          <TagEditor enabled={this.state.tagEditShow} editEntry={this.state.tagEditEntry} closeEditor={this.closeTagEditor}
            ref={this.thetageditor}/>
        </div>
        <ButtonSideBar toggleImageEditor={this.toggleImageEditor}/>
      </div>
      <div className="menu-cloak" style={{display:this.state.cloakEnabled?"":"none"}}></div>
    </>;
  }
}

function main()
{
    ReactDOM.render(<ReactRedux.Provider store={store}><EntryViewerMain/></ReactRedux.Provider>,
      document.querySelector(".main"));

    attachStorageFunctions();
}

window.onload=main;