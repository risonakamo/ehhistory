import Entrys from "./components/entrys/entrys";
import {attachStorageFunctions} from "../shared/storagefunctions";

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
    attachStorageFunctions();
}

window.onload=main;