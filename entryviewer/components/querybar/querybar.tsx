import {updateQuery,EntryViewerStore} from "../../store/entryviewerstore";

import TagEditorInput from "../tageditor/tageditor-bar";

import "./querybar.less";

interface SingleQuery
{
  type:keyof EntryQuery
  query:string|EntryType
}

interface QueryBarProps
{
  imageEditMode:boolean //STORE
  entries:HistoryEntryDict //STORE, only for counting number of entries
}

interface QueryBarState
{
  currentQuery:string
}

/* QueryBar(STORE-bool imageEditMode, STORE-HistoryEntryDict entries) */
class QueryBar extends React.PureComponent
{
  props:QueryBarProps
  state:QueryBarState
  theInputBar:ReactRef<TagEditorInput>

  constructor(props:QueryBarProps)
  {
    super(props);
    this.submitQuery=this.submitQuery.bind(this);

    this.state={
      currentQuery:""
    };

    this.theInputBar=React.createRef();
  }

  componentDidMount()
  {
    this.theInputBar.current.focus();
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
      <div className="input-hold">
        <TagEditorInput placeholder="filter ehhistory" newTag={this.submitQuery}
          noSubmit={true} ref={this.theInputBar} hidden={this.props.imageEditMode}/>

        <div className="entry-count">{_.keys(this.props.entries).length}</div>
      </div>

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

    r[parsedQuery.type].push(parsedQuery.query as EntryType);

    return r;
  },{
    tags:[],
    subtractTags:[],
    addTags:[],
    group:[],
    type:[]
  });
}

// given a single query, return an object giving the type of that query and the query itself,
// with any type denominators removed. an unknown query will just be a tag query.
// maybe improve this function later because it looks really ugly
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

    else if (query[0]=="+")
    {
      return {
        type:"addTags",
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
    var query=colonsplit[1];

    if (colonsplit[0]=="type")
    {
      query=query.toUpperCase();
    }

    else if (colonsplit[0]=="group")
    {
      query=replaceUnderscores(query);
    }

    return {
      type:colonsplit[0],
      query
    };
  }

  return {
    type:"tags",
    query
  };
}

// replace all underscores with a single space, unless it is preceded by
// a backslash
function replaceUnderscores(input:string):string
{
  return input.replace(/(?<!\\)_/g," ").replace(/\\/g,"");
}

export default ReactRedux.connect((storestate:EntryViewerStore)=>{
  return {
    imageEditMode:storestate.imageEditMode,
    entries:storestate.entries
  };
})(QueryBar);