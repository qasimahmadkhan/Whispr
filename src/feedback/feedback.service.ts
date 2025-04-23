import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackService {
    private feedbacks = ['Anonymous feedback 1', 'Anonymous feedback 2'];
    findAll(){
        return this.feedbacks;
    }
}
