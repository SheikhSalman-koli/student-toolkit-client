import React, { useState } from 'react';
import { RxCopy } from "react-icons/rx";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { IoCheckmark } from "react-icons/io5";




const AiActionButtons = ({ replay }) => {

    const [suerCopied, setSureCopied] = useState(false)

    const copyToClipboard = async (textToCopy) => {
        try {
            await navigator?.clipboard?.writeText(textToCopy)
            setSureCopied(true)
            setTimeout(() => setSureCopied(false), 3000)
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="mt-2 flex items-center gap-3">
            {/* copy button */}
            {
                suerCopied ?
                    <button
                        className="hover:bg-gray-200 p-1 rounded-md"
                    >
                        <IoCheckmark />
                    </button>
                    :
                    <div className="tooltip tooltip-bottom" data-tip="Copy">
                        <button
                            className="hover:bg-gray-200 p-1 rounded-md"
                            onClick={() => copyToClipboard(replay)}
                        >
                            <RxCopy />
                        </button>
                    </div>
            }

            {/* like button */}
            <button
                className="hover:bg-gray-200 p-1 rounded-md"
            >
                <AiOutlineLike />
            </button>

            {/* dislike button  */}
            <button
                className="hover:bg-gray-200 p-1 rounded-md"
            >
                <AiOutlineDislike />
            </button>

            {/* share button */}
            <button
                className="hover:bg-gray-200 p-1 rounded-md"
            >
                <PiShareFat />
            </button>
        </div>

    );
};

export default AiActionButtons;