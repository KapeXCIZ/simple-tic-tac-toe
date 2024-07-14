import { Circle, X } from "@phosphor-icons/react";
import Slot from "./Slot";
import { useState, useEffect } from "react";


export default function Board() {
    const [slots, setSlots] = useState(Array(9).fill(""));
    const [gameState, setGameState] = useState("X");
    const [winner, setWinner] = useState()
    const [gameEnded, setGameEnded] = useState(false)
    let clickAudio = new Audio("/click-sound.wav")
    let winAudio = new Audio("/win-sound.wav")

    // const winningCombination = [
    //     [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8],
    //     [0,4,8],
    //     [2,4,6]
    // ]


    function playClick(){
        clickAudio.play();
    }

    function playWin(){
        winAudio.play();
    }

    

    useEffect(() => {
        if(winner !== undefined){
            setGameEnded(true)
            playWin()
        }
    }, [winner])

    useEffect(() => {
        console.log("entrato nel controllo dell'array");
        if (slots[0] === slots[1] && slots[0] === slots[2] && slots[0] !== "") {
            setWinner(slots[0]);
        } else if (slots[3] === slots[4] && slots[3] === slots[5] && slots[3] !== "") {
            setWinner(slots[3]);
        } else if (slots[6] === slots[7] && slots[6] === slots[8] && slots[6] !== "") {
            setWinner(slots[6]);
        } else if (slots[0] === slots[3] && slots[0] === slots[6] && slots[0] !== "") {
            setWinner(slots[0]);
        } else if (slots[1] === slots[4] && slots[1] === slots[7] && slots[1] !== "") {
            setWinner(slots[1]);
        } else if (slots[2] === slots[5] && slots[2] === slots[8] && slots[2] !== "") {
            setWinner(slots[2]);
        } else if (slots[0] === slots[4] && slots[0] === slots[8] && slots[0] !== "") {
            setWinner(slots[0]);
        } else if (slots[2] === slots[4] && slots[2] === slots[6] && slots[2] !== "") {
            setWinner(slots[2]);
        } else if (slots.every(slot => slot !== "")) {
            setWinner("Draw");
        }
    }, [slots]);




    function getAndEditCurrentState() {
        const newGameState = gameState === "X" ? "O" : "X"
        setGameState(newGameState)
        return gameState
    }


    function handleClick(index) {
        if (slots[index] === "") {
            const newGameState = getAndEditCurrentState()
            const newSlots = [...slots]
            newSlots[index] = newGameState
            setSlots(newSlots)
        }
    }

    function reset() {
        setGameState("X");
        setSlots(Array(9).fill(""));
        setWinner(undefined);
        setGameEnded(false);
    }


    return (
        <>
            <div className="flex flex-col gap-3">
                <div className=" font-semibold">
                    <h1>Tris Alekape</h1>
                </div>
                <div className="grid grid-cols-3 gap-3 font-semibold">
                    {slots.map((x, key) => {
                        return <Slot className={"enabled:shadow-md enabled:shadow-slate-600 transition ease-out duration-200 size-20"} playSound={playClick} key={key} index={key} disabled={gameEnded || slots[key] !== ""} handleClick={handleClick}>{x === "X" ? <X size={32} weight="bold" /> : (x === "O" ? <Circle size={32} weight="bold" /> : "")}</Slot>
                    })}
                </div>
                <div className="w-full grid grid-cols-2 gap-3 h-20 text-xl ">
                    <div className="rounded-lg   text-slate-800 bg-slate-400 font-semibold  flex justify-center items-center">
                        {!gameEnded ? <>{gameState}'s turn</> : 
                        <div className="text-white">{winner === "Draw" ? <>Draw</> : <>{winner} won</>}</div>
                        }
                        
                        
                    </div>
                    <button onClick={() => {reset(); playClick()}} className="rounded-lg bg-white shadow-md shadow-slate-600 hover:bg-slate-200">
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}