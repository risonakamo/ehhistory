import "./entrys.less";

/* Entrys(function loadEditor) */
export default class Entrys extends React.PureComponent
{
  props:{
    loadEditor:(entry:HistoryEntry)=>void //load entry for edit function from parent
  }

  state:{
    entries:HistoryEntry[] //array of all entry data
  }

  constructor(props:any)
  {
    super(props);

    this.state={
      entries:[]
    };
  }

  componentDidMount()
  {
    chrome.storage.local.get(null,(storage:LocalStorage)=>{
      var entries=storage.entries || [];

      entries.sort((a:HistoryEntry,b:HistoryEntry)=>{
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

      entries=entries.map((x:HistoryEntry)=>{
        x.image=x.image || "";

        return x;
      });

      this.setState({entries});
    });
  }

  render()
  {
    return <div className="entrys">
      {this.state.entries.map((x:HistoryEntry,i:number)=>{
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
  }

  // activate load editor
  editButtonClick()
  {
    this.props.loadEditor(this.props.entrydata);
  }

  render()
  {
    var typeelement=createTypeElement(this.props.entrydata.type);
    var datestring=moment(this.props.entrydata.date).format("YYYY/MM/DD HH:mm");

    return <div className="entry-row">
      <div className="image-contain">
        <div className="image-box no-image"></div>
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