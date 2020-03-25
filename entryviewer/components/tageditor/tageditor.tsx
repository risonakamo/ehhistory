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

class TagEditorTag extends React.Component
{
  render()
  {
    return <div className="editor-tag">

    </div>;
  }
}