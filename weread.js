document.onkeydown=e=>console.log(e.code,e.keyCode)
document.onkeyup=e=>console.log(e.code,e.keyCode)
document.body.addEventListener(function(e){ console.log(e.key, e.char, e.keyCode) })

const codes={
    left:{
        code: "ArrowLeft",
        key: "ArrowLeft",
        keyCode: 37,
        type: "keydown",
    },
    right:{
        code: "ArrowRight",
        key: "ArrowRight",
        keyCode: 39,
        type: "keydown",
    },
    down:{
        code: "Space",
        key: "Space",
        keyCode: 32,
        type: "keydown",
    },
}

// document.querySelector('[title="下一章"]')?.click()
// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent
// https://stackoverflow.com/questions/1897333/firing-a-keyboard-event-on-chrome


const press=({code,keyCode,type}=codes.right)=>{
    //var e= document.createEvent("MouseEvents");
    //e.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, keyCode, null);
    //e.initKeyboardEvent(type,true,true,window,)
    let e = new KeyboardEvent(type, {
        bubbles : true,
        cancelable : true,
        key: code,
        char : code,
        shiftKey : false
    });
    delete e.keyCode;
    Object.defineProperty(e, "keyCode", {"value" : keyCode})
    document.body.dispatchEvent(e);
}


const sleep=(t=1000)=>new Promise((a,b)=>setTimeout(a,t))


const read=async (
    from=0, //开始章节
    to=2e4, //结束章节
    t=1000, //一屏时间
    t1=6000 //等待加载
)=>{

    await sleep(t1)

    const current=[...document.querySelectorAll('li.chapterItem')].findIndex(x=>x.classList.contains("chapterItem_current"))
    //章节数
    const max_li=document.querySelectorAll('li.chapterItem').length
    const to1=Math.min(to,max_li-current)

    console.log("start",from,"/",to1,t,t1)
    if (from>=to1) {
        console.log(from,to1,"done...")
        return
    }
    window.scrollTo(0,0)
    let max=document.body.scrollHeight
    let h=document.documentElement.scrollTop
    while (max-h >700) {
        scrollByPages(1)
        await sleep(t)
        h=document.documentElement.scrollTop
    }
   console.log("next")
   press()
   console.log("wait %d seconds to load book",t1/1e3)
   read(from+1)
}

//read()
read(0,2e4,1000) // 1秒一屏
//read(0,2e4,6e4) // 60秒一屏
