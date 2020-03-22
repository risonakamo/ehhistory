import "./entry.less";

/* Entry(HistoryEntry entrydata, function loadEditor, bool imageEditEnabled, function toggleAddImageEditEntry,
    bool? diffMode, function? diffModeChanged) */
interface EntryProps extends ReactProps
{
  entrydata:HistoryEntry //the entry data object for this element
  loadEditor:(entry:HistoryEntry)=>void //load entry for edit function from parent
  imageEditEnabled:boolean
  toggleAddImageEditEntry:(entry:HistoryEntry)=>void //function to call to add entry as an entry being edited

  diffMode?:EntryDiffMode //set the entry into a diff mode.
  diffModeChanged?:(newMode:EntryDiffMode,id:number)=>void //function called when diffmode is changed, returns the new diffmode.
                                                           //only required if diffMode is set
}

interface EntryState
{
  editSelected:boolean //currently selected for edit
}

export default class Entry extends React.Component
{
  props:EntryProps
  state:EntryState

  constructor(props:EntryProps)
  {
    super(props);
    this.editButtonClick=this.editButtonClick.bind(this);
    this.imageClick=this.imageClick.bind(this);
    this.toggleDiffMode=this.toggleDiffMode.bind(this);

    this.state={
      editSelected:false
    };
  }

  shouldComponentUpdate(newprops:EntryProps,newstate:EntryState):boolean
  {
    // always render when state has changed
    if (this.state!=newstate)
    {
      return true;
    }

    // always render when props have changed
    if (this.props!=newprops)
    {
      // if propse had image edit enabled and is switching to image edit enabled,
      // force edit selected mode to be disabled
      if (this.props.imageEditEnabled && !newprops.imageEditEnabled)
      {
        this.setState({editSelected:false});
      }

      return true;
    }

    return false;
  }

  // activate load editor
  editButtonClick():void
  {
    this.props.loadEditor(this.props.entrydata);
  }

  // image box click handler
  imageClick():void
  {
    if (this.props.imageEditEnabled)
    {
      this.setState({editSelected:!this.state.editSelected});
      this.props.toggleAddImageEditEntry(this.props.entrydata);
      return;
    }

    if (!this.props.entrydata.image)
    {
      this.editButtonClick();
      return;
    }
  }

  // switch the diff mode based on the current diffmode
  toggleDiffMode():void
  {
    switch (this.props.diffMode)
    {
      case "ADD":
        this.props.diffModeChanged("UNADDED",this.props.entrydata.id);
        break;

      case "UNADDED":
        this.props.diffModeChanged("ADD",this.props.entrydata.id);
        break;
    }
  }

  render()
  {
    var typeelement=createTypeElement(this.props.entrydata.type);
    var datestring=moment(this.props.entrydata.date).format("YYYY/MM/DD HH:mm");

    // --- image element stuff ---
    var noImageClass=this.props.entrydata.image?"":"no-image";
    var imageElement=createThumbnailElement(this.props.entrydata.image);
    var imageEditEnabledClass=this.props.imageEditEnabled?"image-edit":"";
    // --- END ---

    // --- diffmode modifications ---
    var diffModeImageClass=this.props.diffMode?"diff-mode":"";
    var mainDiffModeClass=this.props.diffMode || "";
    // --- END ---

    return <div className={`entry-row ${mainDiffModeClass}`}>
      <div className="image-contain">
        <div className={`image-box ${noImageClass} ${imageEditEnabledClass} ${diffModeImageClass}`}
          onClick={this.imageClick}
        >
          <div className="image-selected" style={{display:this.state.editSelected?"":"none"}}>
            <img src="../imgs/checkbox-dark.svg"/>
          </div>
          {imageElement}
        </div>
        <div className="edit-zone" style={{display:this.props.diffMode?"none":""}}>
          <div className="edit-button edit-button" onClick={this.editButtonClick}><img src="../imgs/triangle-white.svg"/></div>
          <div className="edit-button delete-button"><img src="../imgs/close-salmon.svg"/></div>
        </div>
      </div>
      <div className="content-contain">
        <div className="content-inner">
          <h1><a href={this.props.entrydata.link}>{this.props.entrydata.name}</a></h1>
          <p className="groupname">{this.props.entrydata.group} (1)</p>
          <p className="tags">{typeelement} TAG1 TAG2 TAG3</p>
          <p className="date">{datestring}</p>
        </div>
        <div className="diff-mode-edit" style={{display:this.props.diffMode?"":"none"}} onClick={this.toggleDiffMode}>
          <img src="../imgs/close-salmon.svg"/>
        </div>
      </div>
    </div>;
  }
}

// return a span element for an input type string
function createTypeElement(type:EntryType):HTMLElement
{
  switch (type)
  {
    case "NHENTAI":
      return <span className="type-tag nhentai">NHENTAI</span>;
  }

  return <span className="type-tag other">OTHER</span>;
}

// given an image string, return an image element with proper fit classes
function createThumbnailElement(image:string):AutoResizingImage|null
{
  if (!image)
  {
    return null;
  }

  return <AutoResizingImage image={image}/>;
}

/* AutoResizingImage(string image) */
class AutoResizingImage extends React.PureComponent
{
  props:{
    image:string //the image link
  }

  state:{
    tall:boolean
  }

  theimage:ReactRef<any>

  constructor(props:any)
  {
    super(props);

    this.state={
      tall:false
    };

    this.theimage=React.createRef();
  }

  componentDidMount()
  {
    this.resizeSelf();
  }

  // attempt to auto fit self
  resizeSelf()
  {
    if (this.theimage.current.width>this.theimage.current.height)
    {
      this.setState({tall:true});
    }
  }

  render()
  {
    var tallClass=this.state.tall?"tall":"";

    return <img src={this.props.image} ref={this.theimage} className={tallClass}/>;
  }
}

// converts a history entry dict to date sorted array for render
export function historyEntryDictToArray(entries:HistoryEntryDict):HistoryEntry[]
{
  var entriesArray=Object.values(entries);

  entriesArray.sort((a:HistoryEntry,b:HistoryEntry)=>{
    var adate=Date.parse(a.date);
    var bdate=Date.parse(b.date);

    if (adate>bdate)
    {
      return -1;
    }

    else if (adate<bdate)
    {
      return 1;
    }

    return 0;
  });

  return entriesArray;
}