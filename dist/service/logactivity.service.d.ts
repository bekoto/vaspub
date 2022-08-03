import { Subject } from 'rxjs';
import { LogActivityDto } from 'src/dto/log-activity-dto';
import { LogActivity } from 'src/entity/log-activity';
export declare class LogactivityService {
}
export interface LogActivityManagement {
    log(log: LogActivityDto): Subject<LogActivity>;
}
