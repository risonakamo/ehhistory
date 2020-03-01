import Entrys from "./components/entrys/entrys";

import "./entryviewer.less";

/* EntryViewerMain() */
class EntryViewerMain extends React.Component
{
  render()
  {
    return <>
      <Entrys/>
    </>;
  }
}

function main()
{
    ReactDOM.render(<EntryViewerMain/>,document.querySelector(".main"));
}

window.onload=main;