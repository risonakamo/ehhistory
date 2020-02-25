import runPageParser from "../pageparsers/parserrunner";

/* PopupMain() */
export default class PopupMain extends React.Component
{
  nameElement:ReactRef
  contentElement:ReactRef
  typeElement:ReactRef

  constructor(props:any)
  {
    super(props);
    this.submitEntry=this.submitEntry.bind(this);

    this.nameElement=React.createRef();
    this.contentElement=React.createRef();
    this.typeElement=React.createRef();
  }

  componentDidMount()
  {
    runPageParser();
  }

  submitEntry(e:Event):void
  {
    e.preventDefault();

    console.log(this.nameElement.current.getContent());
  }

  render()
  {
    return <>
      <div className="entry-rows">
        <EntryRow name="Name" content="(C97) [Wasabi Mochi (Momosawa)] Le Malin-chan wa Sabori Jouzu? + Omake (Azur Lane)"
          ref={this.nameElement}/>
        <EntryRow name="Group" content="wasabi mochi" ref={this.contentElement}/>
        <EntryRow name="Type" content="NHSOMETHING" notEditable={true} ref={this.typeElement}/>
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
  contentElement:ReactRef

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
      <div className="entry-content" contentEditable={editability} ref={this.contentElement}>
        {this.props.content}
      </div>
    </div>;
  }
}