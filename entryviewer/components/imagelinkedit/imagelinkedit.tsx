import {ConfirmationButton} from "../entryeditor/entryeditor";
import {EntryViewerStore,setImageEditMode} from "../../store/entryviewerstore";

import "./imagelinkedit.less";

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
    newLinks:{
      [id:number]:string
    }
  }

  constructor(props:any)
  {
    super(props);
    this.closeEditor=this.closeEditor.bind(this);

    this.state={
      newLinks:{}
    };
  }

  // close the editor without saving anything
  closeEditor():void
  {
    this.props.parentCloseEditor(false);
    setImageEditMode(false);
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
        {createEditRows(Object.values(this.props.editEntries))}
      </div>
    </div>;
  }
}

/* ImageLinkEditRow(HistoryEntry editEntry, string editLink) */
class ImageLinkEditRow extends React.PureComponent
{
  props:{
    editEntry:HistoryEntry
    editLink:string //the text of the link being edited
  }

  render()
  {
    return <div className="image-link-edit-row">
      <div className="link-zone split-side">
        <a href={this.props.editEntry.link} target="_blank">{truncateString(this.props.editEntry.link)}</a>
      </div>
      <div className="arrow-point">-></div>
      <div className="split-side edit-contain">
        <div className="edit-zone" contentEditable={true}>{this.props.editLink}</div>
        <div className="bracket-border left"></div>
        <div className="bracket-border right"></div>
      </div>
    </div>;
  }
}

// given array of entries, return image link edits for them
function createEditRows(entries:HistoryEntry[]):ImageLinkEditRow[]
{
  return entries.map((x:HistoryEntry)=>{
    return <ImageLinkEditRow editEntry={x} key={x.id} editLink="a"/>;
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

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    editEntries:storestate.currentImageEditEntries
  };
})(ImageLinkEditor);