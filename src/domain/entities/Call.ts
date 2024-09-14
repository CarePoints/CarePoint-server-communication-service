export class Call {
    constructor(
        public readonly roomId: string,
        public readonly offer?: {
            type: string;
            sdp: string;
        },
        public readonly answer?: {
            type: string;
            sdp: string;
        },
        public readonly iceCandidates?: any[]
    ) {}
}
