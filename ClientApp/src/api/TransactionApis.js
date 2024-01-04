import ApiFetcher from "./ApiFetcher";

class TransactionApis extends ApiFetcher {
  /**
   * GET transactions
   * @param {URLSearchParams} query Params for the API's URL
   * @param {Function} callback Callback function upon successful request
   */
  static getTransactions = (query, callback) => {
    this.getRequest(`/api/Transactions?${query.toString()}`, callback);
  };

  /**
   * GET the number of transactions
   * @param {URLSearchParams} query Params for the API's URL
   * @param {Function} callback Callback function upon successful request
   */
  static getTransactionCounts = (query, callback) => {
    this.getRequest(`/api/Transactions/count?${query.toString()}`, callback);
  };

  /**
   * POST transaction
   * @param {Object} transaction Must include description, timestamp, and amount
   * @param {Function} callback Callback function upon successful request
   */
  static postTransaction = (transaction, callback) => {
    this.postRequest(`api/Transactions`, JSON.stringify(transaction), callback);
  };
}

export default TransactionApis;