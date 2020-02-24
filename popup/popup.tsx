window.onload=main;

import PopupMain from "./popupmain";

import "./popup.less";

function main()
{
    ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
}
