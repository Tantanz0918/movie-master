export interface cityDataInterface{
    ci:number
    ct:string
}

export class cityData implements cityDataInterface{
    constructor(public ci:number,public ct:string){}
    setData(ci:number,ct:string){
        this.ci=ci
        this.ct=ct
    }
}

// export interface 