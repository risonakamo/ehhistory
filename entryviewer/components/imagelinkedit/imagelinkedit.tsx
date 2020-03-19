import {ConfirmationButton} from "../entryeditor/entryeditor";
import {EntryViewerStore,setImageEditMode} from "../../store/entryviewerstore";

import "./imagelinkedit.less";

// an object containing editor image link states, keyed by entry id
interface ImageLinkEdits
{
  [id:number]:string
}

/* ImageLinkEditor(bool showing, function parentCloseEditor, STORE-HistoryEntryDict editEntries) */
class ImageLinkEditor extends React.Component
{
  props:{
    showing:boolean
    editEntries:HistoryEntryDict //the entries currently being edited
    parentCloseEditor:(editOn:boolean)=>void //parent function to close the editor
  }

  state:{
    // the string in the textboxes of all currently being edited
    // image links, keyed by id
    newLinks:ImageLinkEdits
  }

  constructor(props:any)
  {
    super(props);
    this.closeEditor=this.closeEditor.bind(this);
    this.linkChangedHandler=this.linkChangedHandler.bind(this);
    this.linkChangedMultiple=this.linkChangedMultiple.bind(this);

    this.state={
      newLinks:{}
    };
  }

  // close the editor without saving anything
  closeEditor():void
  {
    this.props.parentCloseEditor(false);
    setImageEditMode(false);
    this.setState({newLinks:{}});
  }

  // handle link text change
  linkChangedHandler(newlink:string,id:number):void
  {
    this.setState({
      newLinks:{
        ...this.state.newLinks,
        [id]:newlink
      }
    });
  }

  // handle multiple links changing. updates starting from the current id and
  // goes up in numeric order
  linkChangedMultiple(newlinks:string[],startId:number):void
  {
    var currentNewLinkIndex=0;
    var newimagelinkupdate=getOrderedNumberKeys(this.props.editEntries).reduce((r:ImageLinkEdits,x:string)=>{
      if (parseInt(x)<startId)
      {
        return r;
      }

      // out of new links to add, dont do anything else
      if (currentNewLinkIndex>=newlinks.length)
      {
        return r;
      }

      r[x as any as number]=newlinks[currentNewLinkIndex++].trim();
      return r;
    },{});

    this.setState({
      newLinks:{
        ...this.state.newLinks,
        ...newimagelinkupdate
      }
    });
  }

  render()
  {
    return <div className="image-link-editor" style={{display:this.props.showing?"":"none"}}>
      <div className="buttons">
        <div className="left side">
          <ConfirmationButton type="open"/>
        </div>
        <div className="right side">
          <ConfirmationButton type="confirm"/>
          <ConfirmationButton type="cancel" onClick={this.closeEditor}/>
        </div>
      </div>
      <div className="edit-rows">
        {createEditRows(this.props.editEntries,this.linkChangedHandler,this.state.newLinks,
          this.linkChangedMultiple)}
      </div>
    </div>;
  }
}

/* ImageLinkEditRow(HistoryEntry editEntry, string editLink, function linkEdited, function linkEditedMultiple) */
class ImageLinkEditRow extends React.PureComponent
{
  props:{
    editEntry:HistoryEntry
    editLink:string //the text of the link being edited
    linkEdited:(value:string,id:number)=>void //callback function when image link text is edited,
                                              //returns the new value and the id of this history entry
    linkEditedMultiple:(links:string[],id:number)=>void //multiple links edited callback
  }

  constructor(props:any)
  {
    super(props);
    this.imageLinkEditHandler=this.imageLinkEditHandler.bind(this);
    this.imageLinkPasteHandler=this.imageLinkPasteHandler.bind(this);
  }

  // handle link text area change
  imageLinkEditHandler(e:any):void
  {
    this.props.linkEdited(e.target.value,this.props.editEntry.id);
  }

  // handle paste
  imageLinkPasteHandler(e:any):void
  {
    e.preventDefault();
    var pasteData=e.clipboardData.getData("text").split("\n");
    this.props.linkEditedMultiple(pasteData,this.props.editEntry.id);
  }

  render()
  {
    return <div className="image-link-edit-row">
      <div className="link-zone split-side">
        <a href={this.props.editEntry.link} target="_blank">{truncateString(this.props.editEntry.link)}</a>
      </div>
      <div className="arrow-point">-></div>
      <div className="split-side edit-contain">
        <div className="edit-zone underlay-area">{this.props.editLink}</div>
        <textarea className="edit-zone input-inherit overlay-area" onChange={this.imageLinkEditHandler}
          value={this.props.editLink} onPaste={this.imageLinkPasteHandler}/>
        <div className="bracket-border left"></div>
        <div className="bracket-border right"></div>
      </div>
    </div>;
  }
}

// given array of entries, return image link edits for them
function createEditRows(
  entries:HistoryEntryDict,
  linkChangeHandler:(newlink:string,id:number)=>void,
  currentImageLinks:ImageLinkEdits,
  multiLinkChangeHandler:(links:string[],id:number)=>void
):ImageLinkEditRow[]
{
  return getOrderedNumberKeys(entries).map((x:string)=>{
    var entry:HistoryEntry=entries[x as any as number];

    return <ImageLinkEditRow editEntry={entry} key={entry.id} editLink={currentImageLinks[entry.id] || ""}
      linkEdited={linkChangeHandler} linkEditedMultiple={multiLinkChangeHandler}/>;
  });
}

// given a string, truncate it with "..." if it is longer than some size
function truncateString(input:string,maxlength:number=90):string
{
  if (input.length<=maxlength)
  {
    return input;
  }

  return input.slice(0,90)+"...";
}

// given an object, return an array of the keys of the object, in sorted order.
// the object's keys must be numbers.
function getOrderedNumberKeys(object:Object):string[]
{
  return Object.keys(object).sort(numberKeySort);
}

// sort function for keys that are numbers but are strings (because they are keys)
function numberKeySort(a:string,b:string):number
{
  return parseInt(a)-parseInt(b);
}

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    editEntries:storestate.currentImageEditEntries
  };
})(ImageLinkEditor);