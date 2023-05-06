import { useState } from "react";
import React from "react";

type SaveFileProps = {
    fileSave: (fileContents: string | null, fileObj?: File) => void;
}

export const saveButton = ({fileSave}) => {
    return (
        <div>
            <button className="Save-Button"> Save </button>
        </div>
    )

}