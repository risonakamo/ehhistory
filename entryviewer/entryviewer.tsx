window.onload=main;

import EntryViewerMain from "./entryviewermain";

import "./entryviewer.less";

function main()
{
    ReactDOM.render(<EntryViewerMain/>,document.querySelector(".main"));
}