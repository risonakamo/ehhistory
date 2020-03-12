declare const ReactDOM:any;
declare const chrome:any;
declare const moment:any;
declare const createStore:any;

declare namespace React
{
    class Component
    {
        constructor(props:any)
        setState:Function
    }

    class PureComponent extends Component
    {

    }

    const createRef:Function
}

declare namespace JSX
{
    interface IntrinsicElements
    {
        [key:string]:any
    }
}

type DateString=string;

// chrome tab
interface Tab
{
    url:string
}

// react's ref
interface ReactRef<T>
{
    current:T
}