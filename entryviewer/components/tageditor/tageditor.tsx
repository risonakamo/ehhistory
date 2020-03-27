import "./tageditor.less";

type TagEditorButtonType="done"|"cancel"|"filter"|"delete";

interface TagState
{
    [tagname:string]:boolean
}

interface TagEditorProps
{
  enabled:boolean //editor is enabled or not
  editEntry:HistoryEntry //the history entry being edited currently
  closeEditor:()=>void //called when close button is pressed
}

interface TagEditorState
{
  currentTags:TagState //array of newly added tags by the input
}

/* TagEditor(bool enabled, HistoryEntry editEntry, function closeEditor) */
export default class TagEditor extends React.Component
{
  props:TagEditorProps
  state:TagEditorState

  constructor(props:TagEditorProps)
  {
    super(props);
    this.gotNewTag=this.gotNewTag.bind(this);
    this.updateTag=this.updateTag.bind(this);
    this.closeEditor=this.closeEditor.bind(this);

    this.state={
      currentTags:{}
    };
  }

  shouldComponentUpdate(newprops:TagEditorProps,newstate:TagEditorState):boolean
  {
    if (this.props.editEntry!=newprops.editEntry)
    {
      this.overrideCurrentTags(newprops.editEntry.tags);
      return false;
    }

    return true;
  }

  // add a new tag to the new tags section
  gotNewTag(newtag:string):void
  {
    this.setState({
      currentTags:{
        ...this.state.currentTags,
        [newtag]:true
      }
    });
  }

  // NEED TO IMPLEMENT FOR NON NEW TAGS
  // update a tag's selected state
  updateTag(newSelected:boolean,name:string):void
  {
    this.setState({
      currentTags:{
        ...this.state.currentTags,
        [name]:newSelected
      }
    });
  }

  // create tag elements
  createTags(tagstate:TagState):TagEditorTag[]
  {
    return _.map(tagstate,(x:boolean,i:string)=>{
      return <TagEditorTag name={i} count={0} selected={x} selectedToggled={this.updateTag}/>
    });
  }

  // when loading a new history entry, override all the current tags with the new incoming
  // tags
  overrideCurrentTags(newtags:string[]):void
  {
    this.setState({
      currentTags:_.reduce(newtags,(r:TagState,x:string):TagState=>{
        r[x]=true;
        return r;
      },{})
    });
  }

  // close editor action
  closeEditor():void
  {
    this.setState({currentTags:{}});
    this.props.closeEditor();
  }

  render()
  {
    return <div className="tag-editor" style={{display:this.props.enabled?"":"none"}}>
      <div className="controls-zone">
        <div className="button-zone">
          <TagEditorButton type="done" text="Done"/>
          <TagEditorButton type="cancel" text="Cancel" onClick={this.closeEditor}/>
          <TagEditorButton type="filter" text="AZ"/>
          <TagEditorButton type="delete" text="Delete"/>
        </div>

        <TagEditorInput newTag={this.gotNewTag}/>
      </div>
      <div className="tags-hold">
        {this.createTags(this.state.currentTags)}
      </div>
    </div>;
  }
}

interface TagEditorTagProps
{
  name:string
  count:number
  selected:boolean

  //function called when element is clicked, returns
  //the new selected state of the element and the tag name
  selectedToggled:(newSelected:boolean,name:string)=>void
}

/* TagEditorTag(string name, int count, selected bool, function selectedToggled) */
class TagEditorTag extends React.Component
{
  props:TagEditorTagProps

  constructor(props:TagEditorTagProps)
  {
    super(props);
    this.clickHandler=this.clickHandler.bind(this);
  }

  clickHandler():void
  {
    this.props.selectedToggled(!this.props.selected,this.props.name);
  }

  render()
  {
    return <div className={`editor-tag ${this.props.selected?"selected":""}`} onClick={this.clickHandler}>
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

/* TagEditorButton(TagEditorButtonType type, string text, function onClick) */
class TagEditorButton extends React.Component
{
  props:{
    type:TagEditorButtonType //the icon type
    text:string //the text to display under it
    onClick:(e?:Event)=>void //button is clicked
  }

  render()
  {
    return <div className="tag-edit-button" onClick={this.props.onClick}>
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