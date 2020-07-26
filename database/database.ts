// add an entry, if the entry already exists, only update the dates array.
export function addEntry2(entry:HistoryEntry2):void
{
    chrome.storage.local.get("entries2",(x:LocalStorage)=>{
        var entries2:EntriesDict2=x.entries2 || {};

        // if entry already in database, add the date of the new entry
        // to that entry's list of dates.
        if (entries2[entry.link])
        {
            entries2[entry.link].dates.push(entry.dates[0]);
        }

        else
        {
            entries2[entry.link]=entry;
        }

        chrome.storage.local.set({entries2});
    });
}

// get entries
export async function getEntries2():Promise<EntriesDict2>
{
    return new Promise((resolve)=>{
        chrome.storage.local.get("entries2",(x:LocalStorage)=>{
            resolve(x.entries2 || {});
        });
    });
}