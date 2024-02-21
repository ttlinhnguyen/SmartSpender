import ApiFetcher from "./ApiFetcher";

export default class TargetApis extends ApiFetcher {
  /**
   * GET targets
   * @param {string} token
   * @param {Function} callback Callback function upon successful request
   */
  static getTargets = (token, callback = null) => {
    this.getRequest(`/api/MonthlyTarget`, token, callback);
  };

  /**
   * PUT target
   * @param {string} id
   * @param {Object} body
   * @param {string} token
   * @param {Function} callback Callback function upon successful request
   */
  static putTarget = (id, body, token, callback = null) => {
    this.putRequest(`/api/MonthlyTarget/${id}`, JSON.stringify(body), token, callback);
  };
};