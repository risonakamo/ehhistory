import Entry from "../../../entryviewer/components/entrys/entry";
import {historyEntryDictToArray} from "../../../entryviewer/components/entrys/entry";

import "./entrydiff.less";

/* EntryDiff(HistoryEntryDict entrys) */
interface EntryDiffProps
{
  entrys:HistoryEntryDict //the entries to be diffed
}

export default class EntryDiff extends React.Component
{
  props:EntryDiffProps

  // placeholder function to cancel loadeditor function of
  // entries
  voidLoader(entry:HistoryEntry):void
  {
    // do nothing
  }

  render()
  {
    return <div className="entry-diff">
      {historyEntryDictToArray(this.props.entrys).map((x:HistoryEntry,i:number)=>{
        return <Entry entrydata={x} loadEditor={this.voidLoader} imageEditEnabled={false} key={i}
          toggleAddImageEditEntry={this.voidLoader} diffMode={"ADD"}/>;
      })}
    </div>;
  }
}