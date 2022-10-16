import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as TokenJSON from "./assets/MToken.json";
import * as TokenizedBallotJSON from "./assets/TBallot.json";

require("PRIVATE_KEY").config()

const MTOKEN_ADDRESS = ''; // MyToken
const TBALLOT_ADDRESS = ''; // TokenizedBallot
const MTOKEN_ABI = TokenJSON.abi; // MyToken contract ABI
const TBALLOT_ABI = TokenizedBallotJSON.abi; // TokenizedBallot contract ABI

@Injectable()
export class AppService {
  
  // init
  provider: ethers.providers.Provider;
  myTokenContract: ethers.Contract;
  myTokenSignedContract: ethers.Contract;
  tokenizedBallotContract: ethers.Contract;
  tokenizedBallotSignedContract: ethers.Contract;
  
  constructor() {
    this.provider = ethers.getDefaultProvider('goerli');
    this.myTokenContract = new ethers.Contract(
      MTOKEN_ADDRESS, 
      MTOKEN_ABI, 
      this.provider
    );
    this.tokenizedBallotContract = new ethers.Contract(
      TBALLOT_ADDRESS,
      TBALLOT_ABI,
      this.provider
    );
    const private_key = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(private_key, this.provider);
    const signer = wallet.connect(this.provider);
    this.myTokenSignedContract = this.myTokenContract.connect(signer);
    this.tokenizedBallotSignedContract = this.tokenizedBallotContract.connect(signer);
  }

  async mintTokens (to: string, amt: number) {
    // mint new tokens here!
    const tx = await this.myTokenSignedContract.mint(
      to, 
      ethers.utils.parseEther(amt.toString())
    );
    return tx;
  }

  async delegate (to: string) {
    // delegate voting power here!
    const tx = await this.myTokenSignedContract.delegate(
      to
    );
    return tx;
  }

  async vote(proposal: number, amt: number) {
    // vote here!
    const tx = await this.tokenizedBallotSignedContract.vote(
      proposal,
      ethers.utils.parseEther(amt.toString())
    );
    return tx;
  }

  getVotePower(address: string) {
    // get vote power here!
    return this.tokenizedBallotSignedContract.votePower(address); // returns a BigNumber in hex format
  }

}