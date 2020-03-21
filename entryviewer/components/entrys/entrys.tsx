import {EntryViewerStore,updateEntriesFromStorage,toggleAddImageEditEntry} from "../../store/entryviewerstore";
import Entry,{historyEntryDictToArray} from "./entry";

import "./entrys.less";

/* Entrys(function loadEditor, STORE-HistoryEntryDict entries, STORE-bool imageEditEnabled) */
class Entrys extends React.PureComponent
{
  props:{
    loadEditor:(entry:HistoryEntry)=>void //load entry for edit function from parent
    entries:HistoryEntryDict //all the entries
    imageEditEnabled:boolean //if image edit is enabled
  }

  componentDidMount():void
  {
    updateEntriesFromStorage();
  }

  render()
  {
    return <div className="entrys">
      {historyEntryDictToArray(this.props.entries).map((x:HistoryEntry,i:number)=>{
        return <Entry entrydata={x} key={i} loadEditor={this.props.loadEditor}
          imageEditEnabled={this.props.imageEditEnabled}
          toggleAddImageEditEntry={toggleAddImageEditEntry}/>;
      })}
    </div>;
  }
}

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    entries:storestate.entries,
    imageEditEnabled:storestate.imageEditMode
  };
})(Entrys);