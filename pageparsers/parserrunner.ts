// attempt to run the correct page parser on the current tab. returns a PageParseResult
// in a promise
export default function runPageParser():Promise<PageParseResult>
{
    return new Promise((resolve)=>{
        chrome.tabs.executeScript({file:"pageparsers/nhparser.js"},(res:PageParseResult[])=>{
            resolve(res[0]);
        });
    });
}