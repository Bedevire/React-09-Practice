import { forwardRef, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'

const Modal = forwardRef(function({children, title, buttonLabel}, ref){
    const dialog = useRef();

    useImperativeHandle(ref, () =>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-stone-600">{title}</h2>
            {children}
            <form method="dialog">
                <button className="text-stone-100 bg-stone-800 rounded-md px-4 py-2 border-none" >{buttonLabel}</button>
            </form>
        </dialog>, 
        document.getElementById('modal-root')
    );
});

export default Modal;