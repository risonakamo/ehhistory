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
      </div>
    </div>;
  }
}