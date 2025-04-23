import { Controller, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackservice: FeedbackService){}

    @Get()
    findAll(){
        return this.feedbackservice.findAll();
    }
}
