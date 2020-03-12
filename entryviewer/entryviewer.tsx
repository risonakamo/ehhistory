import Entrys from "./components/entrys/entrys";
import store from "./store/entryviewerstore";
import {attachStorageFunctions} from "../shared/storagefunctions";

// TEMPORARY
import EntryEditor from "./components/entryeditor/entryeditor";

import "./entryviewer.less";

/* EntryViewerMain() */
class EntryViewerMain extends React.Component
{
  state:{
    currentEditEntry:HistoryEntry
    editorShown:boolean
  }

  constructor(props:any)
  {
    super(props);
    this.loadEditor=this.loadEditor.bind(this);
    this.closeEditor=this.closeEditor.bind(this);

    this.state={
      currentEditEntry:{
        id:0,
        name:"",
        group:"",
        type:"OTHER",
        image:"",
        link:"",
        date:""
      },
      editorShown:false
    };
  }

  // load the editor with a history entry
  loadEditor(entry:HistoryEntry):void
  {
    if (!entry.image)
    {
      entry.image="";
    }

    this.setState({
      currentEditEntry:entry,
      editorShown:true
    });
  }

  // close the editor without changes
  closeEditor():void
  {
    this.setState({editorShown:false});
  }

  render()
  {
    return <>
      <Entrys loadEditor={this.loadEditor}/>
      <EntryEditor shown={this.state.editorShown} loadEntry={this.state.currentEditEntry}
        closeEditor={this.closeEditor}/>
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