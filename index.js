function Display({displayText}){
    return(
        <div id="display">
            {displayText}
        </div>
    )
}
function Pads({displayText, setDisplayText}){
    const ops=["+","-","*","/"]
    const [str, setSTr] = React.useState("")
    function handleClick(e){
        const classSet=e.target.classList
        const content=e.target.textContent
        const id=e.target.id
        if(id=="equals"){
            setDisplayText(eval(displayText))
            return
        }
        if(id=="clear"){
            setDisplayText(0)
            setSTr("")
            return
        }
        if(classSet.contains("number")){
            if(displayText==0){
                setDisplayText(content)
            }else{
                if(!(id=="decimal" && /\./.test(str))){     
                    setDisplayText(prev=>prev+content)
                    setSTr(prev=>prev+content)
                }
            }
            return
        }
        if(classSet.contains("op") && displayText!=0){
            setSTr("")
            if(content!="-" && ops.includes(displayText[displayText.length-1])){
                let n=1
                while(ops.includes(displayText[displayText.length-n])){
                    // setDisplayText(prev=>prev.slice(0,-1))
                    n++
                }
                setDisplayText(prev=>prev.slice(0,displayText.length-n+1)+content)
            }else{
                setDisplayText(prev=>prev+content)
            }
            
        }
    }
    return(
        <div onClick={handleClick} className="pads">
            <button className="pad number" id="zero">0</button>
            <button className="pad number" id="one">1</button>
            <button className="pad number" id="two">2</button>
            <button className="pad number" id="three">3</button>
            <button className="pad number" id="four">4</button>
            <button className="pad number" id="five">5</button>
            <button className="pad number" id="six">6</button>
            <button className="pad number" id="seven">7</button>
            <button className="pad number" id="eight">8</button>
            <button className="pad number" id="nine">9</button>
            <button className="pad number" id="decimal">.</button>
            <button className="pad op" id="add">+</button>
            <button className="pad op" id="subtract">-</button>
            <button className="pad op" id="multiply">*</button>
            <button className="pad op" id="divide">/</button>
            <button className="pad" id="clear">AC</button>
            <button className="pad" id="equals">=</button>
        </div>
    )
}
function Calculator(){
    const [displayText, setDisplayText] = React.useState(0)
    return(
        <div className="calculator">
            <Display displayText={displayText}/>
            <Pads displayText={displayText} setDisplayText={setDisplayText}/>
        </div>
    )
}
ReactDOM.render(<Calculator/>,document.getElementById("root"))