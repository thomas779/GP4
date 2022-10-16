import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    mintTokens(to: string, amt: number): Promise<any>;
    delegate(to: string): Promise<any>;
    vote(proposal: number, amt: number): Promise<any>;
    getVotePower(address: string): any;
}
