interface EntryViewerStore
{
    entries:HistoryEntryDict
}

type EntryViewerStoreAction=any;

var store:EntryViewerStore;

function entriesReduce(entries:HistoryEntryDict,act:EntryViewerStoreAction):HistoryEntryDict
{
    return entries;
}

store=createStore((state:EntryViewerStore,act:EntryViewerStoreAction)=>{
    return {
        entries:entriesReduce(state.entries,act)
    };
},{
    entries:{}
} as EntryViewerStore);