type EntryType="NHENTAI"|"OTHER"|"SANKAKU"|"IMGUR"|"DLSITE"|"HITOMI"|
    "PIXIV"|"EXHENTAI";

// a single history database entry
interface HistoryEntry
{
    id:number
    name:string
    group:string
    type:EntryType

    image?:string //might not exist when in database, but should definitely exist
                  //everywhere outside
    link:string

    date:DateString

    tags:string[]
}

// the local storage
interface LocalStorage
{
    entries:HistoryEntryDict
    maxId:number
}

interface HistoryEntryDict
{
    [id:number]:HistoryEntry
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

    group?:string
    type?:EntryType
}