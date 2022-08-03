import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { LogActivityDto } from 'src/dto/log-activity-dto';
import { LogActivity } from 'src/entity/log-activity';

@Injectable()
export class LogactivityService {  

}

export interface LogActivityManagement{
    log(log : LogActivityDto) : Subject<LogActivity>;
}