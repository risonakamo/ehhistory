import "./entryeditor.less";

export default class EntryEditor extends React.Component
{
  render()
  {
    return <div className="entry-editor">
      <div className="editor-row name-row">
        <div className="field-name">NAME</div>
        <textarea/>
      </div>

      <div className="editor-row group-row">
        <div className="field-name">GROUP</div>
        <input type="text"/>
      </div>

      <div className="editor-row">
        <div className="field-name">URL</div>
        <input type="text"/>
      </div>

      <div className="editor-row">
        <div className="field-name">IMAGE</div>
        <input type="text"/>
      </div>

      <div className="editor-row">
        <div className="field-name">TYPE</div>
        <div className="type-choice-hold">
          <TypeChoice type="NHENTAI" selected={true}/>
          <TypeChoice type="OTHER"/>
        </div>
      </div>
    </div>;
  }
}

/* TypeChoice(EntryType type, bool selected) */
class TypeChoice extends React.Component
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