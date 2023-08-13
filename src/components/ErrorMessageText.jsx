import React from "react";

function ErrorMessageText(props) {

    return(
        <div className="text-red-700 text-[18px]"><p>{props.errorMessage}</p></div>
    );
}
export default ErrorMessageText;