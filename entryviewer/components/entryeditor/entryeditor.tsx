import {updateEntry,removeEntry} from "../../store/entryviewerstore";

import "./entryeditor.less";

interface EntryEditorProps
{
  shown:boolean
  loadEntry:HistoryEntry //entry to be edited right now
  closeEditor:()=>void //parent function to close editor
}

interface EntryEditorState
{
  currentEditEntry:HistoryEntry //state of current entry being edited
  deleteMode:boolean
}

/* EntryEditor(bool shown, HistoryEntry loadEntry, function closeEditor) */
export default class EntryEditor extends React.Component
{
  props:EntryEditorProps
  state:EntryEditorState

  constructor(props:EntryEditorProps)
  {
    super(props);
    this.entryEditChange=this.entryEditChange.bind(this);
    this.submitChangedEntry=this.submitChangedEntry.bind(this);
    this.typeChangedHandler=this.typeChangedHandler.bind(this);
    this.deleteButton=this.deleteButton.bind(this);
    this.closeEditor=this.closeEditor.bind(this);

    this.state={
      currentEditEntry:{
        id:0,
        name:"",
        group:"",
        type:"OTHER",
        image:"",
        link:"",
        date:"",
        dates:[],
        tags:[]
      },
      deleteMode:false //prepare for deletion
    };
  }

  shouldComponentUpdate(newprops:EntryEditorProps,newstate:EntryEditorState)
  {
    if (this.props!=newprops)
    {
      this.synchroniseEditorState(newprops.loadEntry);
      return false;
    }

    return true;
  }

  // handle entry editor textbox change events
  private entryEditChange(e:any)
  {
    this.setState({
      currentEditEntry:{
        ...this.state.currentEditEntry,
        [e.target.name]:e.target.value
      }
    });
  }

  // handler for type changing
  typeChangedHandler(newtype:EntryType)
  {
    this.setState({
      currentEditEntry:{
        ...this.state.currentEditEntry,
        type:newtype
      }
    });
  }

  // set the editor state to an incoming load entry
  synchroniseEditorState(loadEntry:HistoryEntry)
  {
    this.setState({currentEditEntry:loadEntry});
  }

  // submit the current edited entry to the storage
  submitChangedEntry()
  {
    if (this.state.deleteMode)
    {
      this.deleteAction();
      return;
    }

    updateEntry(this.state.currentEditEntry);
    this.props.closeEditor();
  }

  // handle clicking the delete button
  deleteButton():void
  {
    this.setState({deleteMode:!this.state.deleteMode});
  }

  //handle close editor button
  closeEditor():void
  {
    if (this.state.deleteMode)
    {
      this.deleteButton();
      return;
    }

    this.props.closeEditor();
  }

  // delete this entry
  deleteAction():void
  {
    removeEntry(this.props.loadEntry);
    this.setState({deleteMode:false});
    this.props.closeEditor();
  }

  render()
  {
    var deleteButtonDMode=this.state.deleteMode?"delete-mode":"";

    return <div className="entry-editor" style={{display:this.props.shown?"":"none"}}>
      <div className="editor-row name-row">
        <div className="field-name">NAME</div>
        <textarea value={this.state.currentEditEntry.name} name="name" onChange={this.entryEditChange}/>
      </div>

      <div className="editor-row group-row">
        <div className="field-name">GROUP</div>
        <input type="text" value={this.state.currentEditEntry.group} name="group" onChange={this.entryEditChange}/>
      </div>

      <div className="editor-row">
        <div className="field-name">URL</div>
        <input type="text" value={this.state.currentEditEntry.link} name="link" onChange={this.entryEditChange}/>
      </div>

      <div className="editor-row">
        <div className="field-name">IMAGE</div>
        <input type="text" value={this.state.currentEditEntry.image} name="image" onChange={this.entryEditChange}/>
      </div>

      <div className="editor-row">
        <div className="field-name">TYPE</div>
        <div className="type-choice-hold">
          {createTypeChoices(this.state.currentEditEntry.type,this.typeChangedHandler)}
        </div>
      </div>

      <div className="editor-row button-row">
        <ConfirmationButton type="confirm" onClick={this.submitChangedEntry} redMode={this.state.deleteMode}/>
        <ConfirmationButton type="cancel" onClick={this.closeEditor} redMode={this.state.deleteMode}/>
        <div className={`delete-button ${deleteButtonDMode}`} onClick={this.deleteButton}>
          <div className="img-contain">
            <img className="close-arrow" src="../imgs/triangle-left-filled-brown.svg"/>
            <img src="../imgs/filled-close-circle-brown.svg"/>
          </div>
        </div>
      </div>
    </div>;
  }
}

/* TypeChoice(EntryType type, bool selected, function typeChosen) */
class TypeChoice extends React.PureComponent
{
  props:{
    type:EntryType
    selected:boolean
    typeChosen:(selectedType:EntryType)=>void //callback choice is clicked, returns the choice
  }

  constructor(props:any)
  {
    super(props);
    this.clickHandler=this.clickHandler.bind(this);
  }

  clickHandler()
  {
    this.props.typeChosen(this.props.type);
  }

  render()
  {
    var selectedClass=this.props.selected?"selected":"";

    var typetext;
    if (!this.props.selected)
    {
      typetext=`[${this.props.type}]`;
    }

    else
    {
      typetext=this.props.type;
    }

    return <div className={`type-choice ${this.props.type} ${selectedClass}`} onClick={this.clickHandler}>
      {typetext}
    </div>;
  }
}

/* ConfirmationButton(function onClick, string type, bool redMode) */
export class ConfirmationButton extends React.PureComponent
{
  props:{
    onClick:()=>void
    type:string //type of icon to use
    redMode?:boolean //have a red background
  }

  render()
  {
    var cancelClass=this.props.type=="cancel"?"cancel":"";
    var redClass=this.props.redMode?"red-mode":"";

    return <div className={`confirmation-button ${cancelClass} ${redClass}`} onClick={this.props.onClick}>
      {createConfirmationButtonIcon(this.props.type)}
    </div>;
  }
}

const _allTypeChoices:EntryType[]=[
  "NHENTAI",
  "OTHER",
  "SANKAKU",
  "IMGUR",
  "DLSITE",
  "HITOMI",
  "PIXIV",
  "EXHENTAI"
];

// return array of type choices, with the current choice set as selected
function createTypeChoices(currentChoice:EntryType,typeChosen:(type:EntryType)=>void):TypeChoice[]
{
  return _allTypeChoices.map((x:EntryType)=>{
    return <TypeChoice type={x} selected={x==currentChoice} typeChosen={typeChosen} key={x}/>;
  });
}

// return an image element for the confirmation button based on a certain string name
function createConfirmationButtonIcon(icon:string):HTMLElement
{
  var iconname;
  switch (icon)
  {
    case "confirm":
      iconname="checkmark-white";
      break;

    case "cancel":
      iconname="close-white";
      break;

    case "open":
      iconname="enter-white";
      break;

    default:
      iconname="unknown";
  }

  return <img src={`../imgs/${iconname}.svg`}/>;
}