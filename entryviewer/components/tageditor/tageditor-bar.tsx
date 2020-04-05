import "./tageditor-bar.less";

/* TagEditorInput(function newTag?, string placeholder?, string className?) */
export default class TagEditorInput extends React.Component
{
  props:{
    newTag?:(newtag:string)=>void //function called when new tag has been submitted. new tag is given.
    placeholder?:string
    className?:string

    ref?:ReactRef<TagEditorInput>
  }
  state:{
    currentValue:string
  }

  constructor(props:any)
  {
    super(props);
    this.inputHandler=this.inputHandler.bind(this);
    this.keyHandler=this.keyHandler.bind(this);

    this.state={
      currentValue:""
    };
  }

  // handle inputs
  inputHandler(e:any):void
  {
    this.setState({currentValue:e.target.value});
  }

  // handle key inputs
  keyHandler(e:any):void
  {
    if (e.key=="Enter")
    {
      if (this.state.currentValue.trim().length)
      {
        this.props.newTag(spaceToUnderscores(this.state.currentValue.trim()));
      }

      this.setState({currentValue:""});
    }
  }

  // clear the input
  public clearInput():void
  {
    this.setState({currentValue:""});
  }

  render()
  {
    var extraClasses=this.props.className || "";

    return <input placeholder={this.props.placeholder} type="text" value={this.state.currentValue}
      className={`tag-editor-input input-inherit ${extraClasses}`}
      onChange={this.inputHandler} onKeyPress={this.keyHandler}/>;
  }
}

// given string, replace all spaces with single underscores
function spaceToUnderscores(input:string):string
{
  return input.replace(/\s+/g,"_");
}