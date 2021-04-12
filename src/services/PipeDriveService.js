import { pipeDriveAPI } from '../apis';
import { AppError } from '../errors';

class PipeDriveService {
  async requestDeals(startOffset = 0) {
    let pipeDriverResponse;

    try {
      pipeDriverResponse = await pipeDriveAPI.get(
        `/deals?status=won&start=${startOffset}&api_token=${process.env.PIPE_TOKEN}`,
      );
    } catch (e) {
      throw new AppError('Error while requesting deals');
    }

    const { data } = pipeDriverResponse.data;

    return data;
  }
}

export default new PipeDriveService();
