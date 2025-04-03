export function isNumber(str: string):boolean {
    return OneLetterRegex(str, '^[0-9]')
}

export function isLowerChar(str:string) {
    return OneLetterRegex(str, '^[a-z]')
}

export function isUpperChar(str:string) {
    return OneLetterRegex(str, '^[A-Z]')
}
export function isChar(str:string) {
    return OneLetterRegex(str, '^[A-Za-z]')
}


function OneLetterRegex(str:string, expr:string) {
    if (typeof str != "string") return false // we only process strings!  
    str = str[0]
    return new RegExp(expr).test(str)
}