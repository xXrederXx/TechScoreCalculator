export function TryConvert<T>(func: (data:any) => T, data:any, defaultValue: T) : T {
    let ret;
    try {
        ret = func(data);
    } catch {
        ret = defaultValue;
    } finally {
        if(ret === undefined)
        {
            ret = defaultValue;
        }
    }
    return ret;
}