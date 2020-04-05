import "./buttonsidebar.less";

interface ButtonSideBarProps
{

}

interface ButtonSideBarState
{
  imageEditMode:boolean
}

/* ButtonSideBar() */
export default class ButtonSideBar extends React.Component
{
  props:ButtonSideBarProps
  state:ButtonSideBarState

  constructor(props:ButtonSideBarProps)
  {
    super(props);
    this.triggerImageEditMode=this.triggerImageEditMode.bind(this);

    this.state={
      imageEditMode:false
    };
  }

  // toggle image edit mode
  triggerImageEditMode():void
  {
    this.setState({imageEditMode:!this.state.imageEditMode});
  }

  render()
  {
    var shuffleHide=false;
    var confirmButtonsHide=true;
    var exportHide=false;
    var imageButtonUnclickable=false;

    // --- image edit mode ---
    if (this.state.imageEditMode)
    {
      shuffleHide=true;
      confirmButtonsHide=false;
      exportHide=true;
      imageButtonUnclickable=true;
    }
    // --- END ---

    return <div className="button-side-bar">
      <div className="float-bar">
        <ButtonSideBarButton imglink="../imgs/download-white.svg" hidden={exportHide}/>
        <ButtonSideBarButton imglink="../imgs/images-white.svg" onClick={this.triggerImageEditMode}
          unclickable={imageButtonUnclickable}/>
        <ButtonSideBarButton imglink="../imgs/shuffle-white.svg" hidden={shuffleHide}/>
        <ButtonSideBarButton imglink="../imgs/checkmark-white.svg" hidden={confirmButtonsHide}/>
        <ButtonSideBarButton imglink="../imgs/close-salmon.svg" hidden={confirmButtonsHide}/>
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