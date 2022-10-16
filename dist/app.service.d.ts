import { ethers } from 'ethers';
export declare class AppService {
    provider: ethers.providers.Provider;
    myTokenContract: ethers.Contract;
    myTokenSignedContract: ethers.Contract;
    tokenizedBallotContract: ethers.Contract;
    tokenizedBallotSignedContract: ethers.Contract;
    constructor();
    mintTokens(to: string, amt: number): Promise<any>;
    delegate(to: string): Promise<any>;
    vote(proposal: number, amt: number): Promise<any>;
    getVotePower(address: string): any;
}
