import "./tageditor-bar.less";

/* TagEditorInput(function newTag) */
export default class TagEditorInput extends React.Component
{
  props:{
    newTag:(newtag:string)=>void //function called when new tag has been submitted. new tag is given.
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
    return <input placeholder="new tag" type="text" className="tag-editor-input input-inherit"
      onChange={this.inputHandler} value={this.state.currentValue} onKeyPress={this.keyHandler}/>;
  }
}

// given string, replace all spaces with single underscores
function spaceToUnderscores(input:string):string
{
  return input.replace(/\s+/g,"_");
}