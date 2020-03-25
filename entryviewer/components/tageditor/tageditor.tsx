import "./tageditor.less";

/* TagEditor() */
export default class TagEditor extends React.Component
{
  render()
  {
    return <div className="tag-editor">
      <TagEditorTag/>
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