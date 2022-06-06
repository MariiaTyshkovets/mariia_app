import React, { useState } from "react";
import './Lesson.css'

const Lesson = () => {

    const [backColor, setBackColor] = useState('whitePar');

    const changeBackColor = () => {
        if (backColor === 'whitePar') {
            setBackColor('redPar');
        } else {
            setBackColor('whitePar');
        }
    }

    return (
        <>
            <div>
                <div className={backColor + ' par'}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <button onClick={changeBackColor}>Change Background</button>
                </div>
            </div>
        </>
    )
}

export default Lesson;