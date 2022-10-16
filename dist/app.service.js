"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const TokenJSON = require("./assets/MToken.json");
const TokenizedBallotJSON = require("./assets/TBallot.json");
require("PRIVATE_KEY").config();
const MTOKEN_ADDRESS = '';
const TBALLOT_ADDRESS = '';
const MTOKEN_ABI = TokenJSON.abi;
const TBALLOT_ABI = TokenizedBallotJSON.abi;
let AppService = class AppService {
    constructor() {
        this.provider = ethers_1.ethers.getDefaultProvider('goerli');
        this.myTokenContract = new ethers_1.ethers.Contract(MTOKEN_ADDRESS, MTOKEN_ABI, this.provider);
        this.tokenizedBallotContract = new ethers_1.ethers.Contract(TBALLOT_ADDRESS, TBALLOT_ABI, this.provider);
        const private_key = process.env.PRIVATE_KEY;
        const wallet = new ethers_1.ethers.Wallet(private_key, this.provider);
        const signer = wallet.connect(this.provider);
        this.myTokenSignedContract = this.myTokenContract.connect(signer);
        this.tokenizedBallotSignedContract = this.tokenizedBallotContract.connect(signer);
    }
    async mintTokens(to, amt) {
        const tx = await this.myTokenSignedContract.mint(to, ethers_1.ethers.utils.parseEther(amt.toString()));
        return tx;
    }
    async delegate(to) {
        const tx = await this.myTokenSignedContract.delegate(to);
        return tx;
    }
    async vote(proposal, amt) {
        const tx = await this.tokenizedBallotSignedContract.vote(proposal, ethers_1.ethers.utils.parseEther(amt.toString()));
        return tx;
    }
    getVotePower(address) {
        return this.tokenizedBallotSignedContract.votePower(address);
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map