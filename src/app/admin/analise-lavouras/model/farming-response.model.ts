import {ProducerResponse} from './producer-response.model';
import {FarmingDetailResponse} from './farming-detail-response';


export class FarmingResponse {
  constructor(public producer?: ProducerResponse,
              public ableFarmings?: FarmingDetailResponse[],
              public unableFarmings?: FarmingDetailResponse[],
              public nomeLavoura?: string[]) {
  }
}
