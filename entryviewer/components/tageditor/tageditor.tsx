import "./tageditor.less";

/* TagEditor() */
export default class TagEditor extends React.Component
{
  render()
  {
    return <div className="tag-editor">
      <div className="controls-zone">
        <TagEditorInput/>
      </div>
      <div className="tags-hold">
        <TagEditorTag/>
      </div>
    </div>;
  }
}

/* TagEditorTag() */
class TagEditorTag extends React.Component
{
  render()
  {
    return <div className="editor-tag">
      <p className="name">Something</p>
      <p>12</p>
    </div>;
  }
}

/* TagEditorInput() */
class TagEditorInput extends React.Component
{
  render()
  {
    return <input placeholder="new tag" type="text" className="tag-editor-input input-inherit"/>;
  }
}