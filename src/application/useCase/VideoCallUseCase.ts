import { Call } from '../../domain/entities/Call';


export class VideoCallUseCase {
    private calls: Map<string, Call> = new Map();

    public createCall(roomId: string,offer: {type: string, sdp: string}): Call{
        const call = new Call(roomId,offer);
        this.calls.set(roomId,call);
        return call;
    }
    public getCall(id:string):Call| undefined{
        return this.calls.get(id);
    }
    public updateCall(id:string, update: Partial<Call>):Call | undefined {
        const call = this.calls.get(id);
        if(call){
            Object.assign(call, update);
            return call;
        }
        return undefined
    }
}