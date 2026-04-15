import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post('generate')
  async generateText(@Body('prompt') prompt: string) {
    if (!prompt) {
      return { error: 'Prompt is required' };
    }
    try {
      const result = await this.openaiService.generateText(prompt);
      return { output: result };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post('process-text')
  async processText(@Body('text') text: string) {
    if (!text) {
      return { error: 'Text input is required' };
    }
    const detailedPrompt = `You are an expert software developer. Your task is to transform the following high-level project requirement into a detailed, actionable set of dev-ready instructions. The instructions should be clear, unambiguous, and specific enough for a developer to pick up and start coding immediately without further clarification. Assume a generic tech stack (e.g., modern web framework, RESTful API, PostgreSQL). Format the output as paragraphs.

Project Requirement:
"""${text}"""

Provide detailed instructions for a developer to implement this, covering:
- API endpoints (if applicable, with methods, paths, and expected request/response structures)
- Database interactions (models, queries, relationships)
- Business logic (how the feature should behave)
- Error handling considerations
- Any relevant assumptions or edge cases.

Remember, all ambiguities will be clarified by the user beforehand, so focus on transforming the provided text into a concrete development plan.`;
    try {
      const result = await this.openaiService.generateText(detailedPrompt);
      return { output: result };
    } catch (error) {
      return { error: error.message };
    }
  }
}
