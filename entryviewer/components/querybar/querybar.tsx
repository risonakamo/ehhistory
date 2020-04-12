import {updateQuery} from "../../store/entryviewerstore";

import TagEditorInput from "../tageditor/tageditor-bar";

import "./querybar.less";

interface SingleQuery
{
  type:keyof EntryQuery
  query:string|EntryType
}

interface QueryBarProps
{

}

interface QueryBarState
{
  currentQuery:string
}

/* QueryBar() */
export default class QueryBar extends React.PureComponent
{
  props:QueryBarProps
  state:QueryBarState

  constructor(props:QueryBarProps)
  {
    super(props);
    this.submitQuery=this.submitQuery.bind(this);

    this.state={
      currentQuery:""
    };
  }

  // apply the query
  submitQuery(queryString:string):void
  {
    updateQuery(createEntryQuery(queryString));
    this.setState({currentQuery:queryString});
  }

  render()
  {
    return <div className="query-bar">
      <TagEditorInput placeholder="filter ehhistory" className="query-bar-input"
        newTag={this.submitQuery} noSubmit={true}/>
      <div className="info-zone" style={{display:this.state.currentQuery.length?"":"none"}}>
        <img src="../imgs/rightpointingarrow-white.svg"/>
        <span>{this.state.currentQuery}</span>
      </div>
    </div>;
  }
}

// given query string, return entry query object
function createEntryQuery(query:string):EntryQuery|null
{
  if (!query.length)
  {
    return null;
  }

  return _.reduce(query.split(" "),(r:EntryQuery,x:string):EntryQuery=>{
    var parsedQuery:SingleQuery=parseSingleQuery(x);

    if (parsedQuery.type=="tags" || parsedQuery.type=="subtractTags")
    {
      r[parsedQuery.type].push(parsedQuery.query);
    }

    else if (!r[parsedQuery.type])
    {
      r[parsedQuery.type]=parsedQuery.query as EntryType;
    }

    return r;
  },{
    tags:[],
    subtractTags:[],
    group:null,
    type:null
  });
}

// given a single query, return an object giving the type of that query and the query itself,
// with any type denominators removed. an unknown query will just be a tag query
function parseSingleQuery(query:string):SingleQuery
{
  var colonsplit=query.split(":");
  if (colonsplit.length==1)
  {
    if (query[0]=="-")
    {
      return {
        type:"subtractTags",
        query:query.slice(1)
      };
    }

    return {
      type:"tags",
      query
    };
  }

  if (colonsplit[0]=="group" || colonsplit[0]=="type")
  {
    return {
      type:colonsplit[0],
      query:colonsplit[1]
    };
  }

  return {
    type:"tags",
    query
  };
}