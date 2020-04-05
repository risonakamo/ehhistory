import TagEditorInput from "../tageditor/tageditor-bar";

import "./querybar.less";

export default class QueryBar extends React.PureComponent
{
  render()
  {
    return <div className="query-bar">
      <TagEditorInput placeholder="filter ehhistory" className="query-bar-input"/>
    </div>;
  }
}