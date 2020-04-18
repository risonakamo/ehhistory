import filterEntries from "./entrydictfilter";

export interface EntryViewerStore
{
    entries:HistoryEntryDict //all the loaded entries
    sortState:SortState

    imageEditMode:boolean //whether image edit mode is enabled
    currentImageEditEntries:HistoryEntryDict //dict of entries about to be edited by image editor

    tagCounts:TagCounts
    groupCounts:GroupCounts

    entryQuery:EntryQuery //state of query filters

    referenceMode:boolean

    dispatch:(action:StoreAction)=>void
}

var store:EntryViewerStore;

// --- ACTIONS ---
// completely replace the history entries with the given one
interface ReplaceEntriesAction
{
    type:"replaceEntries"
    entries:HistoryEntryDict
}

// switch the image mode to the given mode
interface ChangeImageModeAction
{
    type:"changeImageMode"
    mode:boolean
}

// add the given entry to the current edited entries, or remove it
// if it is already there
interface ToggleAddEditEntry
{
    type:"toggleAddEditEntry"
    entry:HistoryEntry
}

// replace the query with the given query
interface ReplaceQuery
{
    type:"replaceQuery"
    query:EntryQuery
}

// toggle the reference mode
interface ToggleReference
{
    type:"ToggleReference"
}

interface ChangeSortMode
{
    type:"ChangeSortMode"
    mode:SortMode
}

type StoreAction=ReplaceEntriesAction|ChangeImageModeAction
    |ToggleAddEditEntry|ReplaceQuery|ToggleReference|ChangeSortMode;

// --- ACCESS FUNCTIONS ---
// update the store by syncing with local storage
export function updateEntriesFromStorage():void
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries=storage.entries || {};

        store.dispatch({
            type:"replaceEntries",
            entries
        });
    });
}

// update an entry in storage with the provided entry. the id should
// already be inside the entry.
export function updateEntry(entry:HistoryEntry):void
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries=storage.entries || {};

        entries[entry.id]=entry;

        chrome.storage.local.set({entries});

        store.dispatch({
            type:"replaceEntries",
            entries
        });
    });
}

// given an array of history entries, update them in the main history entry
// dict and in the storage
export function updateEntries(updateEntries:HistoryEntry[]):void
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries:HistoryEntryDict=storage.entries || {};

        entries=updateEntries.reduce((r:HistoryEntryDict,x:HistoryEntry)=>{
            r[x.id]=x;
            return r;
        },entries);

        chrome.storage.local.set({entries});

        store.dispatch({
            type:"replaceEntries",
            entries
        });
    });
}

// switch the image edit mode to given mode
export function setImageEditMode(newmode:boolean):void
{
    store.dispatch({
        type:"changeImageMode",
        mode:newmode
    });
}

// add the given history entry for image editing, or remove it if it is already
// there.
export function toggleAddImageEditEntry(entry:HistoryEntry):void
{
    store.dispatch({
        type:"toggleAddEditEntry",
        entry
    });
}

// given an entry, remove it from the database
export function removeEntry(entry:HistoryEntry):void
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries=storage.entries || {};

        delete entries[entry.id];

        chrome.storage.local.set({entries});

        store.dispatch({
            type:"replaceEntries",
            entries
        });
    });
}

// replace the current entry query with the given query
export function updateQuery(query:EntryQuery|null):void
{
    if (!query)
    {
        query={
            tags:[],
            subtractTags:[],
            group:[],
            type:[]
        };
    }

    store.dispatch({
        type:"replaceQuery",
        query
    });

    updateEntriesFromStorage();
}

// toggle the reference mode
export function toggleReferenceMode():void
{
    store.dispatch({
        type:"ToggleReference"
    });

    updateEntriesFromStorage();
}

// change the sort mode to the new given mode
export function changeSortMode(newMode:SortMode):void
{
    store.dispatch({
        type:"ChangeSortMode",
        mode:newMode
    });
}

// --- STORE REDUCERS ---
function entriesReduce(entries:HistoryEntryDict,entryQuery:EntryQuery,referenceMode:boolean,
    act:StoreAction):HistoryEntryDict
{
    if (act.type=="replaceEntries")
    {
        return filterEntries(act.entries,entryQuery,referenceMode);
    }

    return filterEntries(entries,entryQuery,referenceMode);
}

function sortStateReduce(sortState:SortState,act:StoreAction):SortState
{
    if (act.type=="ChangeSortMode")
    {
        return {
            ...sortState,
            sortMode:act.mode
        };
    }

    return sortState;
}

function imageEditModeReduce(currentMode:boolean,act:StoreAction):boolean
{
    if (act.type=="changeImageMode")
    {
        return act.mode;
    }

    return currentMode;
}

function imageEditEntriesReduce(editEntries:HistoryEntryDict,act:StoreAction):HistoryEntryDict
{
    if (act.type=="changeImageMode")
    {
        if (!act.mode)
        {
            return {};
        }
    }

    if (act.type=="toggleAddEditEntry")
    {
        var theentry=act.entry;
        var entryId=theentry.id;
        var neweditEntries={...editEntries};

        if (!neweditEntries[entryId])
        {
            neweditEntries[entryId]=theentry;
        }

        else
        {
            delete neweditEntries[entryId];
        }

        return neweditEntries;
    }

    return editEntries;
}

function tagCountsReduce(tagsCounts:TagCounts,act:StoreAction):TagCounts
{
    if (act.type=="replaceEntries")
    {
        return _.countBy(_.flatMap(act.entries,(x:HistoryEntry):string[]=>{
            return x.tags || [];
        }));
    }

    return tagsCounts;
}

function groupCountsReduce(groupCounts:GroupCounts,act:StoreAction):GroupCounts
{
    if (act.type=="replaceEntries")
    {
        return _.countBy(act.entries,(x:HistoryEntry)=>{
            return x.group;
        });
    }

    return groupCounts;
}

function entryQueryReduce(entryQuery:EntryQuery,act:StoreAction):EntryQuery
{
    if (act.type=="replaceQuery")
    {
        return act.query;
    }

    return entryQuery;
}

function referenceModeReduce(referenceMode:boolean,act:StoreAction):boolean
{
    if (act.type=="ToggleReference")
    {
        return !referenceMode;
    }

    return referenceMode;
}

// --- STORE DEFINITION ---
store=Redux.createStore((state:EntryViewerStore,act:StoreAction)=>{
    return {
        entries:entriesReduce(state.entries,state.entryQuery,state.referenceMode,act),
        sortState:sortStateReduce(state.sortState,act),

        imageEditMode:imageEditModeReduce(state.imageEditMode,act),
        currentImageEditEntries:imageEditEntriesReduce(state.currentImageEditEntries,act),

        tagCounts:tagCountsReduce(state.tagCounts,act),
        groupCounts:groupCountsReduce(state.groupCounts,act),

        entryQuery:entryQueryReduce(state.entryQuery,act),

        referenceMode:referenceModeReduce(state.referenceMode,act)
    };
},{
    entries:{},
    sortState:{
        sortMode:"date",
        descend:true
    },

    imageEditMode:false,
    currentImageEditEntries:{},

    tagCounts:{},
    groupCounts:{},

    entryQuery:{
        tags:[],
        subtractTags:[],
        group:[],
        type:[]
    },

    referenceMode:false
} as EntryViewerStore);

export default store;