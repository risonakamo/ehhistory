import Entry from "../../../entryviewer/components/entrys/entry";
import {historyEntryDictToArray} from "../../../entryviewer/components/entrys/entry";

import "./entrydiff.less";

/* EntryDiff(HistoryEntryDict entrys) */
interface EntryDiffProps
{
  entrys:HistoryEntryDict //the entries to be diffed
  ref:ReactRef<EntryDiff>
}

export default class EntryDiff extends React.Component
{
  props:EntryDiffProps
  state:{
    currentDiffModes:{
      [id:number]:EntryDiffMode
    }
  }

  constructor(props:EntryDiffProps)
  {
    super(props);
    this.updateDiffMode=this.updateDiffMode.bind(this);

    this.state={
      currentDiffModes:{}
    };
  }

  // placeholder function to cancel loadeditor function of
  // entries
  voidLoader(entry:HistoryEntry):void
  {
    // do nothing
  }

  updateDiffMode(newMode:EntryDiffMode,id:number):void
  {
    this.setState({
      currentDiffModes:{
        ...this.state.currentDiffModes,
        [id]:newMode
      }
    });
  }

  // PUBLIC upload to storage
  uploadEntries():void
  {
    var filteredEntries:HistoryEntryDict=_.pickBy(this.props.entrys,(x:HistoryEntry)=>{
      return this.state.currentDiffModes[x.id]!="UNADDED";
    });

    chrome.storage.local.get(["entries","maxId"],(storage:LocalStorage)=>{
      var storageEntries:HistoryEntryDict=storage.entries || {};
      var storageMaxId:number=storage.maxId || 0;

      for (var x in filteredEntries)
      {
        ++storageMaxId;
        storageEntries[storageMaxId]={
          ...filteredEntries[x],
          id:storageMaxId
        };
      }

      chrome.storage.local.set({entries:storageEntries,maxId:storageMaxId});
    });
  }

  render()
  {
    return <div className="entry-diff">
      {historyEntryDictToArray(this.props.entrys).map((x:HistoryEntry,i:number)=>{
        var diffMode=this.state.currentDiffModes[x.id] || "ADD";
        return <Entry entrydata={x} loadEditor={this.voidLoader} imageEditEnabled={false} key={i}
          toggleAddImageEditEntry={this.voidLoader} diffMode={diffMode} diffModeChanged={this.updateDiffMode}
          loadTagEditor={this.voidLoader}/>;
      })}
    </div>;
  }
}