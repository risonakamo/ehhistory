import runPageParser from "../pageparsers/parserrunner";

/* PopupMain() */
export default class PopupMain extends React.Component
{
  state:{
    currentName:string
    currentGroup:string
    currentType:EntryType
  }

  currentUrl:string

  nameElement:ReactRef<EntryRow>
  groupElement:ReactRef<EntryRow>
  typeElement:ReactRef<EntryRow>

  constructor(props:any)
  {
    super(props);
    this.submitEntry=this.submitEntry.bind(this);

    this.state={
      currentName:"",
      currentGroup:"",
      currentType:null
    };

    this.currentUrl="";

    this.nameElement=React.createRef();
    this.groupElement=React.createRef();
    this.typeElement=React.createRef();
  }

  async componentDidMount()
  {
    var parserResult:PageParseResultWithType=await runPageParser();

    this.currentUrl=parserResult.url;
    this.setState({
      currentName:parserResult.name,
      currentGroup:parserResult.group,
      currentType:parserResult.type
    });
  }

  submitEntry(e:Event):void
  {
    e.preventDefault();

    console.log({
      name:this.nameElement.current.getContent(),
      group:this.groupElement.current.getContent(),
      type:this.state.currentType,
      link:this.currentUrl,
      date:new Date().toISOString()
    } as HistoryEntry);
  }

  render()
  {
    return <>
      <div className="entry-rows">
        <EntryRow name="Name" content={this.state.currentName} ref={this.nameElement}/>
        <EntryRow name="Group" content={this.state.currentGroup} ref={this.groupElement}/>
        <EntryRow name="Type" content={this.state.currentType} notEditable={true} ref={this.typeElement}/>
      </div>
      <div className="submit-zone">
        <div className="submit-icon-hold bottom">
          <img className="submit-plus" src="../assets/addicon-brown.svg"/>
        </div>
        <a className="submit-icon-hold top" href="" onClick={this.submitEntry}>
          <img className="submit-plus" src="../assets/addicon-white.svg"/>
        </a>
      </div>
    </>;
  }
}

/* EntryRow(string name, string content, bool notEditable)*/
class EntryRow extends React.Component
{
  props:{
    name:string //the name field
    content:string //the content
    notEditable:boolean //make the content field not editable
  }
  contentElement:ReactRef<any>

  constructor(props:any)
  {
    super(props);

    this.contentElement=React.createRef();
  }

  getContent():string
  {
    return this.contentElement.current.textContent;
  }

  render()
  {
    var editability=this.props.notEditable?false:true;

    return <div className="entry-row">
      <div className="entry-name">{this.props.name}</div>
      <div className="entry-content" contentEditable={editability}
        ref={this.contentElement} suppressContentEditableWarning={true}
      >
        {this.props.content}
      </div>
    </div>;
  }
}