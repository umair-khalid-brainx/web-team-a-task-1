import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OpenAIController } from './openai/openai.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenAIService } from './openai/openai.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, OpenAIController],
  providers: [AppService, OpenAIService],
})
export class AppModule {}
