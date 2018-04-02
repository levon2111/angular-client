import {environment} from '../../environments/environment';

export class AppConfigs {
  public static readonly BACK_HOST = environment.production ? 'http://heartface.tv' : 'http://127.0.0.1:8000';
}
