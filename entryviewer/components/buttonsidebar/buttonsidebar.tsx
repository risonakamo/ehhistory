import {EntryViewerStore,setImageEditMode,toggleReferenceMode} from "../../store/entryviewerstore";

import "./buttonsidebar.less";

interface ButtonSideBarProps
{
  imageEditMode:boolean
  toggleImageEditor:(editorOn?:boolean)=>void //callback function to toggle the image editor
}

/* ButtonSideBar(STORE-bool imageEditMode, function toggleImageEditor) */
class ButtonSideBar extends React.Component
{
  props:ButtonSideBarProps

  constructor(props:ButtonSideBarProps)
  {
    super(props);
    this.triggerImageEditMode=this.triggerImageEditMode.bind(this);
    this.openExportPage=this.openExportPage.bind(this);
  }

  // toggle image edit mode
  triggerImageEditMode():void
  {
    setImageEditMode(!this.props.imageEditMode);
  }

  openExportPage():void
  {
    chrome.tabs.create({
      url:"../exportimport/exportimport.html",
      active:true
    });
  }

  render()
  {
    var shuffleHide=false;
    var confirmButtonsHide=true;
    var exportHide=false;
    var imageButtonUnclickable=false;
    var refModeHide=false;

    // --- image edit mode ---
    if (this.props.imageEditMode)
    {
      shuffleHide=true;
      confirmButtonsHide=false;
      exportHide=true;
      imageButtonUnclickable=true;
      refModeHide=true;
    }
    // --- END ---

    return <div className="button-side-bar">
      <div className="float-bar">
        <ButtonSideBarButton imglink="../imgs/download-white.svg" hidden={exportHide}
          onClick={this.openExportPage}/>
        <ButtonSideBarButton imglink="../imgs/images-white.svg" onClick={this.triggerImageEditMode}
          unclickable={imageButtonUnclickable}/>
        <ButtonSideBarButton imglink="../imgs/shuffle-white.svg" hidden={shuffleHide}/>
        <ButtonSideBarButton imglink="../imgs/flagfilled-white.svg" hidden={refModeHide} onClick={toggleReferenceMode}/>

        <ButtonSideBarButton imglink="../imgs/checkmark-white.svg" hidden={confirmButtonsHide}
          onClick={this.props.toggleImageEditor}/>
        <ButtonSideBarButton imglink="../imgs/close-salmon.svg" hidden={confirmButtonsHide}
          onClick={this.triggerImageEditMode}/>
      </div>
    </div>;
  }
}

interface ButtonSideBarButtonProps
{
  imglink?:string
  onClick?:()=>void
  unclickable?:boolean //makes the button not trigger clicks and have no hover animations
  hidden?:boolean
}

/* ButtonSideBarButton(string imglink, function onClick, bool unclickable, bool hidden) */
class ButtonSideBarButton extends React.PureComponent
{
  props:ButtonSideBarButtonProps

  constructor(props:ButtonSideBarButtonProps)
  {
    super(props);
    this.clickAction=this.clickAction.bind(this);
  }

  clickAction():void
  {
    if (!this.props.unclickable && this.props.onClick)
    {
      this.props.onClick();
    }
  }

  render()
  {
    var unclickableClass=this.props.unclickable?"unclickable":"";

    return (
      <div className={`button-side-bar-button ${unclickableClass}`} onClick={this.clickAction}
        style={{display:this.props.hidden?"none":""}}
      >
        <img src={this.props.imglink}/>
      </div>
    );
  }
}

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    imageEditMode:storestate.imageEditMode
  };
})(ButtonSideBar);