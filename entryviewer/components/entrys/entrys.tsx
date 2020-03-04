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
      this.setState({entries:storage.entries?storage.entries:[]});
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
    return <div className="entry-row">
      <div className="image-contain">
        <div className="image-box no-image"></div>
      </div>
      <div className="content-contain">
        <div className="content-inner">
          <h1>{this.props.entrydata.name}</h1>
          <p className="groupname">{this.props.entrydata.group} (1)</p>
          <p className="tags"><span className="type1test">TYPENAME</span> TAG1 TAG2 TAG3</p>
          <p className="date">2020/03/01</p>
        </div>
      </div>
    </div>;
  }
}