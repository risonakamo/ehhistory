/* PopupMain() */
export default class PopupMain extends React.Component
{
  render()
  {
    return <>
      <div className="entry-rows">
        <EntryRow name="Name" content="(C97) [Wasabi Mochi (Momosawa)] Le Malin-chan wa Sabori Jouzu? + Omake (Azur Lane)"/>
        <EntryRow name="Group" content="wasabi mochi"/>
        <EntryRow name="Type" content="NHSOMETHING" notEditable={true}/>
      </div>
      <div className="submit-zone">
        <div className="submit-icon-hold bottom">
          <img className="submit-plus" src="../assets/addicon-brown.svg"/>
        </div>
        <a className="submit-icon-hold top" href="">
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

  render()
  {
    var editability=this.props.notEditable?false:true;

    return <div className="entry-row">
      <div className="entry-name">{this.props.name}</div>
      <div className="entry-content" contentEditable={editability}>{this.props.content}</div>
    </div>;
  }
}