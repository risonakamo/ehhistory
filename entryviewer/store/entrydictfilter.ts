export default function filterEntries(entries:HistoryEntryDict,query:EntryQuery):HistoryEntryDict
{
    return _.pickBy(entries,(x:HistoryEntry):boolean=>{
        return hasTags(x,query.tags) && doesNotHaveTags(x,query.subtractTags);
    });
}

// given an entry and array of tags, return whether the entry has ALL the tags or not
// always returns true if tags are empty
function hasTags(entry:HistoryEntry,tags:string[]):boolean
{
    if (!tags.length || _.intersection(entry.tags,tags).length==tags.length)
    {
        return true;
    }

    return false;
}

// returns true if an entry has NONE of the given tags, or if subtract tags is empty
function doesNotHaveTags(entry:HistoryEntry,subtractTags:string[]):boolean
{
    if (!subtractTags.length || _.intersection(entry.tags,subtractTags)==0)
    {
        return true;
    }

    return false;
}