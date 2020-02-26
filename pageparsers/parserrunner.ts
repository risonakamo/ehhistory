export default function runPageParser()
{
    chrome.tabs.executeScript({file:"pageparsers/nhparser.js"},(res:any)=>{
        console.log("page parser result",res);
    });
}