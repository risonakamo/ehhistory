export default function filterEntries(entries:HistoryEntryDict,query:EntryQuery):HistoryEntryDict
{
    return _.pickBy(entries,(x:HistoryEntry):boolean=>{
        return hasTags(x,query.tags) && doesNotHaveTags(x,query.subtractTags)
            && isGroup(x,query.group) && isType(x,query.type);
    });
}

// given an entry and array of tags, return whether the entry has ALL the tags or not
// always returns true if tags are empty
function hasTags(entry:HistoryEntry,tags:string[]):boolean
{
    return !tags.length || _.intersection(entry.tags,tags).length==tags.length;
}

// returns true if an entry has NONE of the given tags, or if subtract tags is empty
function doesNotHaveTags(entry:HistoryEntry,subtractTags:string[]):boolean
{
    return !subtractTags.length || _.intersection(entry.tags,subtractTags)==0;
}

// returns if the entry has the specified group name or always true if there was no
// group name specified
function isGroup(entry:HistoryEntry,group:string):boolean
{
    return !group || entry.group==group;
}

// returns if entry was the type and always true if no type is given
function isType(entry:HistoryEntry,type:EntryType):boolean
{
    return !type || entry.type==type;
}