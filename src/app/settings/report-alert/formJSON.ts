import { Validators } from "@angular/forms";
import { SettingsForm } from "./form.interface";

export const ModelConfigForm:SettingsForm[]=[{
    type:'number',
    name:'person',
    label:'person',
    value:0,
    validations:[{
        name:'required',
        validator:'required',
        message:''
    },
]},
    {
        type:'number',
        name:'helmet',
        label:'helmet',
        value:0,
        validations:[{
            name:'required',
            validator:'required',
            message:''
        }],
    },
    {
        type:'number',
        name:'helmet',
        label:'helmet',
        value:0,
        validations:[{
            name:'required',
            validator:'required',
            message:''
        }],
    }

]

export const VideoAnalyticsConfigForm:SettingsForm[]=[
    {
    
        type:'number',
        name:'camera_fps',
        label:'Camera FPS',
        value:0,
        validations:[{
            name:'required',
            validator:'required',
            message:''
        }]
    },
    {
    
        type:'number',
        name:'data_save_interval',
        label:'Data Save Interval',
        value:0,
        validations:[{
            name:'required',
            validator:'required',
            message:''
        }]
    },
    {
    
        type:'number',
        name:'drop_frame_interval',
        label:'Drop Frame Interval',
        value:0,
        validations:[{
            name:'required',
            validator:'required',
            message:''
        }]
    },
    {
    
        type:'number',
        name:'rtsp_reconnect_interval',
        label:'RTSP Reconnect Interval',
        value:0,
        validations:[{
            name:'required',
            validator:'required',
            message:''
        }]
    }
    ]

