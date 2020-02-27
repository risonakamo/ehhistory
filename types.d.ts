declare const ReactDOM:any;
declare const chrome:any;

declare namespace React
{
    class Component
    {
        constructor(props:any)
        setState:Function
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
type ReactRef=any;
type Tab=any;

type EntryType="NHENTAI"|"OTHER";

// a single history database entry
interface HistoryEntry
{
    name:string
    group:string
    type:EntryType

    link:string

    date:DateString
}

// the local storage
interface LocalStorage
{
    entries:HistoryEntry[]
}

// return data from a page parser script
interface PageParseResult
{
    name:string
    group:string
}

interface PageParseResultWithType extends PageParseResult
{
    type:EntryType
    url:string
}