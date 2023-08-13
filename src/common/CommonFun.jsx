import { bookType } from "./Variable";

export function GetBookType(type) {
    let currType = "";
    switch (Number(type)) {
        case bookType.Non_fiction:
            currType = "Non-fiction.";
            break;
        case bookType.Edited_non_fiction:
            currType = "Edited (non-fiction)";
            break;
        case bookType.Reference_non_fiction:
            currType = "Reference (non-fiction)";
            break;
        case bookType.Fiction:
            currType = "Fiction.";
            break;
        default:
            currType = "No Option";
            break;
    }
    return currType;
} 