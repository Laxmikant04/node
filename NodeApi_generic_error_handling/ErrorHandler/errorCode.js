var ErrorDetails = {
    001: "Incorrect Email address.",
    002: "Incorrect password."
};

class ErrorCode {
    static getCodeDescription(code){
        return ErrorDetails[code];
    }
}
module.exports=ErrorCode;