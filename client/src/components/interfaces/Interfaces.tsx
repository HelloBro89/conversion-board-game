export interface SocketData {
    name: string;
    age: number;
}

export interface IInitialState {
    hostsData: IHostData[];
    connectedSocket: any;
    playerNames: string[];
}

export interface IHostData {
    numOfPlayers: string;
    gameTime: string;
    hostName: string;
    hostID: string;
    // players: string[];
}

// for SETTING FUNCTION

export interface ISetNewHost {
    type: string;
    payload: IHostData;
}

export interface ISetHostsData {
    type: string;
    payload: IHostData[];
}

export interface ISetSocketConnection {
    type: string;
    payload: any;
}
