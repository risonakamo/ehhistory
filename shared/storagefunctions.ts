function clearAll()
{
    chrome.storage.local.clear();
}

function showAll()
{
    chrome.storage.local.get(null,(storage:LocalStorage)=>{
        console.log(storage);
    });
}

// repairs the storage entries item from a HistoryEntry[] to
// a HistoryEntryDict. should only be used if entries is an array
// and not a dict, as it should be.
function convertStorageArrayToDict()
{
    chrome.storage.local.get(["entries","maxId"],(storage:LocalStorage)=>{
        if (storage.entries && !Array.isArray(storage.entries))
        {
            console.log("entries was not an array, ending");
            return;
        }

        var entries:HistoryEntry[]=(storage.entries as HistoryEntry[]) || [];
        var maxId=storage.maxId || 0;

        var entriesDict=entries.reduce((r:HistoryEntryDict,x:HistoryEntry)=>{
            r[++maxId]=x;
            return r;
        },{});

        chrome.storage.local.set({entries:entriesDict,maxId});
    });
}

// update HistoryEntry objects in the entries with the id number
function fixMissingIds()
{
    chrome.storage.local.get("entries",(storage:LocalStorage)=>{
        var entries=storage.entries || {};

        for (var x in entries)
        {
            entries[x].id=parseInt(x);
        }

        chrome.storage.local.set({entries});
    });
}

// call this function to attach storage functions to dom window
export function attachStorageFunctions()
{
    (window as any).showAll=showAll;
    (window as any).clearAll=clearAll;
    (window as any).convertStorageArrayToDict=convertStorageArrayToDict;
    (window as any).fixMissingIds=fixMissingIds;
}