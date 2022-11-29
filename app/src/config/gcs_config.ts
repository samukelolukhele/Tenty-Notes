const config = {
  type: 'service_account',
  project_id: process.env.GCS_PROJECT,
  private_key: process.env.GCS_PRIVATE_KEY,
  client_email: process.env.GCS_CLIENT_EMAIL,
};

export default JSON.stringify(config);
