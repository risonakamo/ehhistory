import {updateEntry} from "../../store/entryviewerstore";

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

    this.state={
      currentEditEntry:{
        name:"",
        group:"",
        type:"OTHER",
        image:"",
        link:"",
        date:""
      }
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
  entryEditChange(e:any)
  {
    this.setState({
      currentEditEntry:{
        ...this.state.currentEditEntry,
        [e.target.name]:e.target.value
      }
    });
  }

  // set the editor state to an incoming load entry
  synchroniseEditorState(loadEntry:HistoryEntry)
  {
    this.setState({currentEditEntry:loadEntry});
  }

  render()
  {
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
          <TypeChoice type="NHENTAI"/>
          <TypeChoice type="OTHER"/>
        </div>
      </div>

      <div className="editor-row button-row">
        <ConfirmationButton/>
        <ConfirmationButton cancel={true} onClick={this.props.closeEditor}/>
      </div>
    </div>;
  }
}

/* TypeChoice(EntryType type, bool selected) */
class TypeChoice extends React.PureComponent
{
  props:{
    type:EntryType
    selected:boolean
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

    return <div className={`type-choice ${this.props.type} ${selectedClass}`}>
      {typetext}
    </div>;
  }
}

/* ConfirmationButton(bool cancel, function onClick) */
class ConfirmationButton extends React.PureComponent
{
  props:{
    cancel:boolean //make the button appear as a cancel button
    onClick:()=>void
  }

  render()
  {
    var cancelClass=this.props.cancel?"cancel":"";

    var iconLink;
    if (!this.props.cancel)
    {
      iconLink="../imgs/checkmark-white.svg";
    }

    else
    {
      iconLink="../imgs/close-white.svg";
    }

    return <div className={`confirmation-button ${cancelClass}`} onClick={this.props.onClick}>
      <img src={iconLink}/>
    </div>;
  }
}