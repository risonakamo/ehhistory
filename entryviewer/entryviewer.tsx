import Entrys from "./components/entrys/entrys";
import {attachStorageFunctions} from "../shared/storagefunctions";

// TEMPORARY
import EntryEditor from "./components/entryeditor/entryeditor";

import "./entryviewer.less";

/* EntryViewerMain() */
class EntryViewerMain extends React.Component
{
  render()
  {
    return <>
      <Entrys/>
      <EntryEditor/>
    </>;
  }
}

function main()
{
    ReactDOM.render(<EntryViewerMain/>,document.querySelector(".main"));
    attachStorageFunctions();
}

window.onload=main;