export function clearAll()
{
    chrome.storage.local.clear();
}

export function showAll()
{
    chrome.storage.local.get(null,(storage:LocalStorage)=>{
        console.log(storage);
    });
}

// call this function to attach storage functions to dom window
export function attachStorageFunctions()
{
    (window as any).showAll=showAll;
    (window as any).clearAll=clearAll;
}