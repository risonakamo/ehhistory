import {updateQuery} from "../../store/entryviewerstore";

import TagEditorInput from "../tageditor/tageditor-bar";

import "./querybar.less";

interface QueryBarProps
{

}

export default class QueryBar extends React.PureComponent
{
  props:QueryBarProps

  constructor(props:QueryBarProps)
  {
    super(props);
    this.submitQuery=this.submitQuery.bind(this);
  }

  submitQuery(queryString:string):void
  {
    console.log("the query",queryString);
  }

  render()
  {
    return <div className="query-bar">
      <TagEditorInput placeholder="filter ehhistory" className="query-bar-input"
        newTag={this.submitQuery}/>
    </div>;
  }
}