import {EntryViewerStore,updateEntry} from "../../store/entryviewerstore";
import TagEditorInput from "./tageditor-bar";

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
  allTags:TagCounts //all tags from the store

  ref?:ReactRef<TagEditor>
}

interface TagEditorState
{
  currentTags:TagState //tag state of tags already in the entry and newly added tags
  otherTags:TagState //tag state of other tags
}

/* TagEditor(bool enabled, HistoryEntry editEntry, function closeEditor, STORE-TagCounts allTags) */
class TagEditor extends React.Component
{
  props:TagEditorProps
  state:TagEditorState

  tageditorinput:ReactRef<TagEditorInput>

  constructor(props:TagEditorProps)
  {
    super(props);
    this.gotNewTag=this.gotNewTag.bind(this);
    this.updateTag=this.updateTag.bind(this);
    this.closeEditor=this.closeEditor.bind(this);
    this.submitTags=this.submitTags.bind(this);

    this.state={
      currentTags:{},
      otherTags:{}
    };

    this.tageditorinput=React.createRef();
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

  // update a tag's selected state
  // give other tags to update in othertags instead of current tags
  updateTag(newSelected:boolean,name:string,otherTags?:boolean):void
  {
    var tagSection:keyof TagEditorState=otherTags?"otherTags":"currentTags";

    this.setState({
      [tagSection]:{
        ...this.state[tagSection],
        [name]:newSelected
      }
    });
  }

  // create tag elements
  createTags(tagstate:TagState,otherTags?:boolean):TagEditorTag[]
  {
    var updatetag=(newSelected:boolean,name:string)=>{
      this.updateTag(newSelected,name,otherTags);
    };

    return _.map(tagstate,(x:boolean,i:string)=>{
      return <TagEditorTag name={i} count={this.props.allTags[i]} selected={x} selectedToggled={updatetag} key={i}/>
    });
  }

  // when loading a new history entry, override all the current tags with the new incoming
  // tags
  overrideCurrentTags(newtags:string[]):void
  {
    var currentTags=_.reduce(newtags,(r:TagState,x:string):TagState=>{
      r[x]=true;
      return r;
    },{});

    this.setState({
      currentTags,
      otherTags:this.filterFromAllTags(currentTags)
    });
  }

  // PUBLIC
  // perform override of current tags with current history entry loaded
  public loadEntry():void
  {
    this.overrideCurrentTags(this.props.editEntry.tags);
  }

  // close editor action
  closeEditor():void
  {
    this.setState({currentTags:{}});
    this.tageditorinput.current.clearInput();
    this.props.closeEditor();
  }

  // submit tags action
  submitTags():void
  {
    updateEntry({
      ...this.props.editEntry,
      tags:this.getSelectedTags()
    });

    this.closeEditor();
  }

  // return string array of all tags that have been selected
  getSelectedTags():string[]
  {
    var combinedTags:TagState={
      ...this.state.currentTags,
      ...this.state.otherTags
    };

    return _.filter(_.map(combinedTags,(x:boolean,i:string):string|undefined=>{
      if (x)
      {
        return i;
      }
    }));
  }

  // return a tag state from the alltags, removing any tags that count as newtags
  filterFromAllTags(newtags:TagState):TagState
  {
    var filteredAllTags:TagCounts=_.omit(this.props.allTags,Object.keys(newtags));

    return _.mapValues(filteredAllTags,()=>{
      return false;
    });
  }

  render()
  {
    return <div className="tag-editor" style={{display:this.props.enabled?"":"none"}}>
      <div className="controls-zone">
        <div className="button-zone">
          <TagEditorButton type="done" text="Done" onClick={this.submitTags}/>
          <TagEditorButton type="cancel" text="Cancel" onClick={this.closeEditor}/>
          <TagEditorButton type="filter" text="AZ"/>
          <TagEditorButton type="delete" text="Delete"/>
        </div>

        <TagEditorInput newTag={this.gotNewTag} ref={this.tageditorinput}/>
      </div>

      <div className="tags-hold">
        <p className="tag-hold-title">Current Tags</p>
        {this.createTags(this.state.currentTags)}
      </div>

      <div className="tags-hold">
        <p className="tag-hold-title">Other Tags</p>
        {this.createTags(this.state.otherTags,true)}
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

  key:any
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
      <p className="count">{this.props.count}</p>
    </div>;
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

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    allTags:storestate.tagCounts
  }
},null,null,{forwardRef:true})(TagEditor);