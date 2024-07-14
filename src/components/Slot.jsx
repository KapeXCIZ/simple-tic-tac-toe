
export default function Slot({handleClick, children, index, className, disabled, playSound}){
    
    return (
        <>
            <button id={index} disabled={disabled} onClick={() => {handleClick(index); playSound()}} className={`bg-white text-3xl flex items-center justify-center rounded-lg   ${className}`}>
                {children}
            </button>
        </>
    )
}