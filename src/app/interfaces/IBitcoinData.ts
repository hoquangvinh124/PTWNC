import { IBitcoinBPI } from './IBitcoinBPI';
import { IBitcoinTime } from './IBitcoinTime';

export interface IBitcoinData {
  time: IBitcoinTime;
  disclaimer: string;
  chartName: string;
  bpi: IBitcoinBPI;
}
