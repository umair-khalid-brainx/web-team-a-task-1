import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPEN_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('OPEN_API_KEY is not defined in the environment variables.');
    }
    this.openai = new OpenAI({ apiKey });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        model: 'gpt-4.1-mini', // Using the specified model
        messages: [{ role: 'user', content: prompt }],
      });
      return chatCompletion.choices[0].message.content || '';
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw new InternalServerErrorException('Failed to generate text from OpenAI.');
    }
  }
}
