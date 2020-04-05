import "./buttonsidebar.less";

/* ButtonSideBar() */
export default class ButtonSideBar extends React.Component
{
  render()
  {
    return <div className="button-side-bar">
      <div className="float-bar">
        <ButtonSideBarButton imglink="../imgs/download-white.svg"/>
        <ButtonSideBarButton imglink="../imgs/images-white.svg"/>
        <ButtonSideBarButton imglink="../imgs/shuffle-white.svg"/>
      </div>
    </div>;
  }
}

/* ButtonSideBarButton(string imglink) */
class ButtonSideBarButton extends React.PureComponent
{
  props:{
    imglink:string
  }

  render()
  {
    return <div className="button-side-bar-button">
      <img src={this.props.imglink}/>
    </div>;
  }
}