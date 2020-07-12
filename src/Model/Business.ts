import { BusinessUsers } from './BusinessUsers'
import { BusinessOwner } from './BusinessOwner'

export class Business{
    constructor(public businessID?:number,
        public businessName?:string,
        public businessOwnerID?:string,
        public businessPhoneNo?:string,
        public businessAddress?:string,
        public businessCity?:string,
        public businessSpace?:boolean,
        public noOfRegisters?:number

    )
    {

    }


}