import {EntryViewerStore,updateEntriesFromStorage,
  toggleAddImageEditEntry,changeSortMode} from "../../store/entryviewerstore";
import Entry from "./entry";
import {sortEntries} from "./entrysorts";

import "./entrys.less";

interface EntrysProps
{
  loadEditor:(entry:HistoryEntry)=>void //load entry for edit function from parent
  loadTagEditor:(entry:HistoryEntry)=>void
  entries:HistoryEntryDict //STORE: all the entries
  imageEditEnabled:boolean //STORE: if image edit is enabled
  groupCounts:GroupCounts //STORE
  sortState:SortState //STORE
}

interface EntrysState
{
  entryOrder:number[]
}

/* Entrys(function loadEditor, STORE-HistoryEntryDict entries, STORE-bool imageEditEnabled,
    function loadTagEditor, STORE-GroupCounts groupCounts, STORE-SortState sortState) */
class Entrys extends React.PureComponent
{
  props:EntrysProps
  state:EntrysState

  constructor(props:EntrysProps)
  {
    super(props);

    this.state={
      entryOrder:[]
    };
  }

  componentDidMount():void
  {
    updateEntriesFromStorage();
  }

  // create the Entry objects from the current entries and sort state settings
  createEntrys():Entry[]
  {
    return _.map(sortEntries(this.props.entries,this.props.sortState,this.state.entryOrder),
    (x:HistoryEntry,i:number)=>{
      return <Entry entrydata={x} key={i} loadEditor={this.props.loadEditor}
        imageEditEnabled={this.props.imageEditEnabled}
        toggleAddImageEditEntry={toggleAddImageEditEntry}
        loadTagEditor={this.props.loadTagEditor}
        groupCount={this.props.groupCounts[x.group]}/>;
    });
  }

  // shuffle the entries
  public shuffle():void
  {
    changeSortMode("shuffle");
    this.setState({
      entryOrder:_.shuffle(_.keys(this.props.entries))
    });
  }

  render()
  {
    return <div className="entrys">
      {this.createEntrys()}
    </div>;
  }
}

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    entries:storestate.entries,
    imageEditEnabled:storestate.imageEditMode,
    groupCounts:storestate.groupCounts,
    sortState:storestate.sortState
  };
},null,null,{forwardRef:true})(Entrys);