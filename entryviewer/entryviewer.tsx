import Entrys from "./components/entrys/entrys";
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

    this.state={
      currentEditEntry:{
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
    this.setState({
      currentEditEntry:entry,
      editorShown:true
    });
  }

  render()
  {
    return <>
      <Entrys loadEditor={this.loadEditor}/>
      <EntryEditor shown={this.state.editorShown} loadEntry={this.state.currentEditEntry}/>
    </>;
  }
}

function main()
{
    ReactDOM.render(<EntryViewerMain/>,document.querySelector(".main"));
    attachStorageFunctions();
}

window.onload=main;