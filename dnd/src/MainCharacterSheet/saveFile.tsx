import { useState } from "react";

type SaveFileProps = {
    fileSave: (fileContents: string | null, fileObj?: File) => void;
}

export const saveFile: React.FC<SaveFileProps> = ({fileSave}) => {
    
}