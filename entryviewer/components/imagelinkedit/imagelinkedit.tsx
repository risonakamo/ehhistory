import {EntryViewerStore} from "../../store/entryviewerstore";

import "./imagelinkedit.less";

/* ImageLinkEditor(bool showing, STORE-HistoryEntryDict editEntries) */
class ImageLinkEditor extends React.Component
{
  props:{
    showing:boolean
    editEntries:HistoryEntryDict //the entries currently being edited
  }

  render()
  {
    return <div className="image-link-editor" style={{display:this.props.showing?"":"none"}}>
      <ImageLinkEditRow/>
      <ImageLinkEditRow/>
      <ImageLinkEditRow/>
    </div>;
  }
}

/* ImageLinkEditRow() */
class ImageLinkEditRow extends React.PureComponent
{
  render()
  {
    return <div className="image-link-edit-row">
      <div className="link-zone split-side">
        <a href="https://nhentai.net/g/297846/" target="_blank">https://nhentai.net/g/297846/</a>
      </div>
      <div className="arrow-point">-></div>
      <div className="split-side edit-contain">
        <div className="edit-zone" contentEditable={true}></div>
        <div className="bracket-border left"></div>
        <div className="bracket-border right"></div>
      </div>
    </div>;
  }
}

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    editEntries:storestate.currentImageEditEntries
  };
})(ImageLinkEditor);