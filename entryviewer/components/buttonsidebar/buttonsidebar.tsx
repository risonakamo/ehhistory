import "./buttonsidebar.less";

/* ButtonSideBar() */
export default class ButtonSideBar extends React.Component
{
  render()
  {
    return <div className="button-side-bar">
      <div className="float-bar">
        <ButtonSideBarButton/>
      </div>
    </div>;
  }
}

/* ButtonSideBarButton() */
class ButtonSideBarButton extends React.PureComponent
{
  render()
  {
    return <div className="button-side-bar-button">

    </div>;
  }
}