export default function filterEntries(entries:HistoryEntryDict,query:EntryQuery,
    referenceMode:boolean=false):HistoryEntryDict
{
    return _.pickBy(entries,(x:HistoryEntry):boolean=>{
        return hasTags(x,query.tags) && doesNotHaveTags(x,query.subtractTags)
            && isGroup(x,query.group) && isType(x,query.type)
            && (referenceMode || !(x.reference || false)) && hasAnyTags(x,query.addTags);
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

// returns true if the entry is one of the groups specified in groups, or if groups is empty
function isGroup(entry:HistoryEntry,groups:string[]):boolean
{
    return !groups.length || groups.includes(entry.group);
}

// returns true if the entry has one of the types in the array of types, or the array
// of types is empty
function isType(entry:HistoryEntry,types:EntryType[]):boolean
{
    return !types.length || types.includes(entry.type);
}

// returns true if the entry has at least one of the the given tags,
// or the given tags is empty
function hasAnyTags(entry:HistoryEntry,tags:string[]):boolean
{
    return !tags.length || _.some(tags,(x:string)=>{
        return _.includes(entry.tags,x);
    });
}