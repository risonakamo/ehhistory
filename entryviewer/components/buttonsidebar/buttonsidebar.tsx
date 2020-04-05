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

  // enable image edit mode
  triggerImageEditMode():void
  {
    this.setState({imageEditMode:true});
  }

  render()
  {
    return <div className="button-side-bar">
      <div className="float-bar">
        <ButtonSideBarButton imglink="../imgs/download-white.svg"/>
        <ButtonSideBarButton imglink="../imgs/images-white.svg" onClick={this.triggerImageEditMode}/>
        <ButtonSideBarButton imglink="../imgs/shuffle-white.svg"/>
        <ButtonSideBarButton imglink="../imgs/checkmark-white.svg"/>
        <ButtonSideBarButton imglink="../imgs/close-salmon.svg"/>
      </div>
    </div>;
  }
}

interface ButtonSideBarButtonProps
{
  imglink?:string
  onClick?:()=>void
  unclickable?:boolean //makes the button not trigger clicks and have no hover animations
}

/* ButtonSideBarButton(string imglink, function onClick, bool unclickable) */
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

    return <div className={`button-side-bar-button ${unclickableClass}`} onClick={this.clickAction}>
      <img src={this.props.imglink}/>
    </div>;
  }
}