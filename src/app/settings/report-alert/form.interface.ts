export interface SettingsForm{
    type:string,
    label:string,
    name:string,
    value:string|boolean|number,
    options?:{label:string,value:string}[]
    validations:{
        name:string,
        validator:any,
        message:string
    }[]
}