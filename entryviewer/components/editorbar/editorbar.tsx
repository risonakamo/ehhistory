import {EntryViewerStore,setImageEditMode} from "../../store/entryviewerstore";

import "./editorbar.less";

/* EditorBar(STORE-bool imageEditMode) */
class EditorBar extends React.PureComponent
{
  props:{
    imageEditMode:boolean
  }

  constructor(props:any)
  {
    super(props);
    this.tempImageModeToggle=this.tempImageModeToggle.bind(this);
  }

  tempImageModeToggle(e:Event)
  {
    e.preventDefault();

    setImageEditMode(!this.props.imageEditMode);
  }

  render()
  {
    var imageEditText=this.props.imageEditMode?"disable image edit mode":"image edit mode";

    return <div className="editor-bar">
      <a href="" onClick={this.tempImageModeToggle}>{imageEditText}</a>
    </div>;
  }
}

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    imageEditMode:storestate.imageEditMode
  };
})(EditorBar);