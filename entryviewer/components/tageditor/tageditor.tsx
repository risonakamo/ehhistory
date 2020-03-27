import "./tageditor.less";

type TagEditorButtonType="done"|"cancel"|"filter"|"delete";

interface TagEditorProps
{
  enabled:boolean //editor is enabled or not
  editEntry:HistoryEntry //the history entry being edited currently
}

interface TagState
{
    [tagname:string]:boolean
}

/* TagEditor(bool enabled, HistoryEntry editEntry) */
export default class TagEditor extends React.Component
{
  props:TagEditorProps

  state:{
    newTags:TagState //array of newly added tags by the input
  }

  constructor(props:TagEditorProps)
  {
    super(props);
    this.gotNewTag=this.gotNewTag.bind(this);

    this.state={
      newTags:{}
    };
  }

  // add a new tag to the new tags section
  gotNewTag(newtag:string):void
  {
    this.setState({
      newTags:{
        ...this.state.newTags,
        [newtag]:true
      }
    });
  }

  // create tag elements
  createTags(tagstate:TagState):TagEditorTag[]
  {
    return _.map(tagstate,(x:boolean,i:string)=>{
      return <TagEditorTag name={i} count={0} selected={x}/>
    });
  }

  render()
  {
    return <div className="tag-editor" style={{display:this.props.enabled?"":"none"}}>
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
        {this.createTags(this.state.newTags)}
      </div>
    </div>;
  }
}

/* TagEditorTag(string name, int count, selected bool) */
class TagEditorTag extends React.Component
{
  props:{
    name:string
    count:number
    selected:boolean
  }

  render()
  {
    return <div className={`editor-tag ${this.props.selected?"selected":""}`}>
      <p className="name">{this.props.name}</p>
      <p>{this.props.count}</p>
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