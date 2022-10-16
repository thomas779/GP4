import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mint-tokens')
  mintTokens(
    @Query("to") to: string,
    @Query("amt") amt: number
  ) {
    return this.appService.mintTokens(to, amt);
  }

  @Post('delegate')
  delegate(
    @Query("to") to: string,
  ) {
    return this.appService.delegate(to);
  }
  
  @Post('vote')
  vote(
    @Query("proposal") proposal: number,
    @Query("amt") amt: number,
  ) {
    return this.appService.vote(proposal, amt);
  }

  @Get('vote-power')
  getVotePower(
    @Query("address") address: string,
  ) {
    return this.appService.getVotePower(address);
  }

  

}