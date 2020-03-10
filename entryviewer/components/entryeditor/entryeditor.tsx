import "./entryeditor.less";

/* EntryEditor(bool shown, HistoryEntry loadEntry, function closeEditor) */
export default class EntryEditor extends React.Component
{
  props:{
    shown:boolean
    loadEntry:HistoryEntry //entry to be edited right now
    closeEditor:()=>void //parent function to close editor
  }

  render()
  {
    return <div className="entry-editor" style={{display:this.props.shown?"":"none"}}>
      <div className="editor-row name-row">
        <div className="field-name">NAME</div>
        <textarea value={this.props.loadEntry.name}/>
      </div>

      <div className="editor-row group-row">
        <div className="field-name">GROUP</div>
        <input type="text" value={this.props.loadEntry.group}/>
      </div>

      <div className="editor-row">
        <div className="field-name">URL</div>
        <input type="text" value={this.props.loadEntry.link}/>
      </div>

      <div className="editor-row">
        <div className="field-name">IMAGE</div>
        <input type="text" value={this.props.loadEntry.link}/>
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