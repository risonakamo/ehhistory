type EntryType="NHENTAI"|"OTHER"|"SANKAKU"|"IMGUR"|"DLSITE"|"HITOMI"|
    "PIXIV"|"EXHENTAI"|"BETASANKAKU";

// a single history database entry
interface HistoryEntry
{
    id:number // deprecated with entriesdict2
    name:string
    group:string
    type:EntryType

    image?:string //might not exist when in database, but should definitely exist
                  //everywhere outside
    link:string

    date:DateString // deprecated with entriesdict2
    dates:DateString[]

    tags:string[]

    reference?:boolean
}

//where key is link url
type EntriesDict2=Record<string,HistoryEntry>;

// where key is id number
type HistoryEntryDict=Record<number,HistoryEntry>;

// the local storage
interface LocalStorage
{
    entries:HistoryEntryDict
    entries2:EntriesDict2
    maxId:number
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

type EntryDiffMode="ADD"|"UNADDED";

interface TagCounts
{
    [tagname:string]:number
}

interface GroupCounts
{
    [groupname:string]:number
}

interface EntryQuery
{
    tags:string[]
    subtractTags:string[]
    addTags:string[]

    group:string[]
    type:EntryType[]
}

type SortMode="shuffle"|"date";
interface SortState
{
    sortMode:SortMode
    descend:boolean
}