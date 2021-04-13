import axios from 'axios';

const pipeDriveAPI = axios.create({
  baseURL: `https://${process.env.PIPE_COMPANY_DOMAIN}.pipedrive.com/api/v1`,
});

export default pipeDriveAPI;
