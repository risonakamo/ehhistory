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
          <TypeChoice type="NHENTAI"/>
          <TypeChoice type="OTHER"/>
        </div>
      </div>
    </div>;
  }
}

/* TypeChoice(EntryType type) */
class TypeChoice extends React.Component
{
  props:{
    type:EntryType
  }

  render()
  {
    return <div className={`type-choice ${this.props.type}`}>[{this.props.type}]</div>;
  }
}