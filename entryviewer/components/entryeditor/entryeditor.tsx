import "./entryeditor.less";

export default class EntryEditor extends React.Component
{
  render()
  {
    return <div className="entry-editor">
      <div className="editor-row">
        <div className="field-name">GROUP</div>
        <input type="text"/>
      </div>

      <div className="editor-row">
        <div className="field-name">URL</div>
        <input type="text"/>
      </div>
    </div>;
  }
}