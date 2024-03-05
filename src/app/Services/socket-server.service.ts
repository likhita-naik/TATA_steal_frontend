import { Injectable } from "@angular/core";
import { config } from "rxjs";

import {io} from 'socket.io-client'
import { configService } from "./config.service";
@Injectable({
    providedIn:'root'
})

export class SocketService{
    public socket:any  
    constructor(public config:configService){
        this.socket=io(config.IP
        )
        this.socket.of("/message").on("connection", (socket:any) => {
           console.log('socket of message is connected')
          });
    }
}