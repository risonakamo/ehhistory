import {EntryViewerStore,updateEntriesFromStorage} from "../../store/entryviewerstore";

import "./entrys.less";

/* Entrys(function loadEditor, store-HistoryEntryDict entries) */
class Entrys extends React.PureComponent
{
  props:{
    loadEditor:(entry:HistoryEntry)=>void //load entry for edit function from parent
    entries:HistoryEntryDict
  }

  componentDidMount()
  {
    updateEntriesFromStorage();
  }

  render()
  {
    return <div className="entrys">
      {historyEntryDictToArray(this.props.entries).map((x:HistoryEntry,i:number)=>{
        return <Entry entrydata={x} key={i} loadEditor={this.props.loadEditor}/>;
      })}
    </div>;
  }
}

/* Entry(HistoryEntry entrydata, function loadEditor) */
class Entry extends React.PureComponent
{
  props:{
    entrydata:HistoryEntry //the entry data object for this element
    loadEditor:(entry:HistoryEntry)=>void //load entry for edit function from parent
  }

  constructor(props:any)
  {
    super(props);
    this.editButtonClick=this.editButtonClick.bind(this);
    this.imageClick=this.imageClick.bind(this);
  }

  // activate load editor
  editButtonClick()
  {
    this.props.loadEditor(this.props.entrydata);
  }

  // image box click handler
  imageClick()
  {
    if (!this.props.entrydata.image)
    {
      this.editButtonClick();
      return;
    }
  }

  render()
  {
    var typeelement=createTypeElement(this.props.entrydata.type);
    var datestring=moment(this.props.entrydata.date).format("YYYY/MM/DD HH:mm");

    return <div className="entry-row">
      <div className="image-contain">
        <div className="image-box no-image" onClick={this.imageClick}></div>
        <div className="edit-zone">
          <div className="edit-button edit-button" onClick={this.editButtonClick}><img src="../imgs/triangle-white.svg"/></div>
          <div className="edit-button delete-button"><img src="../imgs/close-salmon.svg"/></div>
        </div>
      </div>
      <div className="content-contain">
        <div className="content-inner">
          <h1><a href={this.props.entrydata.link}>{this.props.entrydata.name}</a></h1>
          <p className="groupname">{this.props.entrydata.group} (1)</p>
          <p className="tags">{typeelement} TAG1 TAG2 TAG3</p>
          <p className="date">{datestring}</p>
        </div>
      </div>
    </div>;
  }
}

// return a span element for an input type string
function createTypeElement(type:EntryType)
{
  switch (type)
  {
    case "NHENTAI":
      return <span className="type-tag nhentai">NHENTAI</span>;
  }

  return <span className="type-tag other">OTHER</span>;
}

// converts a history entry dict to date sorted array for render
function historyEntryDictToArray(entries:HistoryEntryDict):HistoryEntry[]
{
  var entriesArray=Object.values(entries);

  entriesArray.sort((a:HistoryEntry,b:HistoryEntry)=>{
    var adate=Date.parse(a.date);
    var bdate=Date.parse(b.date);

    if (adate>bdate)
    {
      return -1;
    }

    else if (adate<bdate)
    {
      return 1;
    }

    return 0;
  });

  return entriesArray;
}

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    entries:storestate.entries
  };
})(Entrys);