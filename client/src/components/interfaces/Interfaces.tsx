export interface SocketData {
    name: string;
    age: number;
}

export interface IInitialState {
    hostsData: IHostData[];
    connectedSocket: any;
    playerNames: string[];
}

// export interface IPlayerNames {}

export interface IHostData {
    numOfPlayers: string;
    gameTime: string;
    hostName: string;
}

// export interface ServerToClientEvents {
//     noArg: () => void;
//     basicEmit: (a: string, b: string, c: Buffer) => void;
//     withAck: (d: string, callback: (e: number) => void) => void;
// }

// export interface ClientToServerEvents {
//     hello: () => void;
// }

// export interface InterServerEvents {
//     ping: () => void;
// }
