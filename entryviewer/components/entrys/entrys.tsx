import "./entrys.less";

/* Entrys() */
export default class Entrys extends React.Component
{
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
      var entries=storage.entries?storage.entries:[];
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

      this.setState({entries});
    });
  }

  render()
  {
    return <div className="entrys">
      {this.state.entries.map((x:HistoryEntry,i:number)=>{
        return <Entry entrydata={x} key={i}/>;
      })}
    </div>;
  }
}

/* Entry(HistoryEntry entrydata) */
class Entry extends React.Component
{
  props:{
    entrydata:HistoryEntry //the entry data object for this element
  }

  render()
  {
    var typeelement=createTypeElement(this.props.entrydata.type);
    var datestring=moment(this.props.entrydata.date).format("YYYY/MM/DD HH:mm");

    return <div className="entry-row">
      <div className="image-contain">
        <div className="image-box no-image"></div>
        <div className="edit-zone">
          <div className="edit-button edit-button"></div>
          <div className="edit-button delete-button"><img src="../imgs/close-white.svg"/></div>
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