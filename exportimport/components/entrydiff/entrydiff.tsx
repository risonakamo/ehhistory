import {Entry} from "../../../entryviewer/components/entrys/entrys";

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

  }

  render()
  {
    return <div className="entry-diff">

    </div>;
  }
}