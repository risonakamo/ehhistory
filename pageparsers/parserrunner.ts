export default function runPageParser()
{
    chrome.tabs.executeScript({file:"build/nhparser-build.js"},(res:any)=>{
        console.log("page parser result",res);
    });
}