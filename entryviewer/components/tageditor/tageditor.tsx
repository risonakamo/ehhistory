import "./tageditor.less";

type TagEditorButtonType="done"|"cancel"|"filter"|"delete";

/* TagEditor() */
export default class TagEditor extends React.Component
{
  render()
  {
    return <div className="tag-editor">
      <div className="controls-zone">
        <div className="button-zone">
          <TagEditorButton type="done" text="Done"/>
          <TagEditorButton type="cancel" text="Cancel"/>
          <TagEditorButton type="filter" text="AZ"/>
          <TagEditorButton type="delete" text="Delete"/>
        </div>

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

/* TagEditorButton(TagEditorButtonType type, string text) */
class TagEditorButton extends React.Component
{
  props:{
    type:TagEditorButtonType //the icon type
    text:string //the text to display under it
  }

  render()
  {
    return <div className="tag-edit-button">
      <img src={resolveTagButtonImage(this.props.type)}/>
      <p>{this.props.text}</p>
    </div>;
  }
}

// return image path given a tag editor button type
function resolveTagButtonImage(type:TagEditorButtonType):string
{
  var resolveImg:string;
  switch (type)
  {
    case "done":
      resolveImg="checkmark-white.svg";
      break;

    case "cancel":
      resolveImg="close-white.svg";
      break;

    case "filter":
      resolveImg="twoline-white.svg";
      break;

    case "delete":
      resolveImg="close-circle-white.svg";
      break;
  }

  return `../imgs/${resolveImg}`;
}