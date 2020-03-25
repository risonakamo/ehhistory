import "./tageditor.less";

type TagEditorButtonType="done"|"cancel"|"filter"|"delete";

/* TagEditor() */
export default class TagEditor extends React.Component
{
  // TEMP
  gotNewTag(newtag:string):void
  {
    console.log("new tag",newtag);
  }

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

        <TagEditorInput newTag={this.gotNewTag}/>
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

/* TagEditorInput(function newTag) */
class TagEditorInput extends React.Component
{
  props:{
    newTag:(newtag:string)=>void //function called when new tag has been submitted. new tag is given.
  }
  state:{
    currentValue:string
  }

  constructor(props:any)
  {
    super(props);
    this.inputHandler=this.inputHandler.bind(this);
    this.keyHandler=this.keyHandler.bind(this);

    this.state={
      currentValue:""
    };
  }

  // handle inputs
  inputHandler(e:any):void
  {
    this.setState({currentValue:e.target.value});
  }

  // handle key inputs
  keyHandler(e:any):void
  {
    if (e.key=="Enter")
    {
      if (this.state.currentValue.trim().length)
      {
        this.props.newTag(this.state.currentValue.trim());
      }

      this.setState({currentValue:""});
    }
  }

  render()
  {
    return <input placeholder="new tag" type="text" className="tag-editor-input input-inherit"
      onChange={this.inputHandler} value={this.state.currentValue} onKeyPress={this.keyHandler}/>;
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