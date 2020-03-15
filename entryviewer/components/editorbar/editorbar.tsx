import {EntryViewerStore,setImageEditMode} from "../../store/entryviewerstore";

import "./editorbar.less";

/* EditorBar(STORE-bool imageEditMode, function toggleImageEditor) */
class EditorBar extends React.PureComponent
{
  props:{
    imageEditMode:boolean //STORE, whether it is image edit mode now
    toggleImageEditor:(editorOn?:boolean)=>void //function to toggle or set the image editor
  }

  constructor(props:any)
  {
    super(props);
    this.tempImageModeToggle=this.tempImageModeToggle.bind(this);
    this.openImageEditorClick=this.openImageEditorClick.bind(this);
  }

  tempImageModeToggle(e:Event):void
  {
    e.preventDefault();

    setImageEditMode(!this.props.imageEditMode);
  }

  openImageEditorClick(e:Event):void
  {
    e.preventDefault();
    this.props.toggleImageEditor();
  }

  render()
  {
    var imageEditText=this.props.imageEditMode?"disable image edit mode":"image edit mode";

    return <div className="editor-bar">
      <a href="" onClick={this.tempImageModeToggle}>{imageEditText}</a>
      <a href="" style={{display:this.props.imageEditMode?"":"none"}} onClick={this.openImageEditorClick}>
        edit selected images
      </a>
    </div>;
  }
}

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    imageEditMode:storestate.imageEditMode
  };
})(EditorBar);