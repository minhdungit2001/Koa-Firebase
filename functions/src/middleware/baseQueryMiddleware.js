const { DEFAULT_LIMIT } = require("../const/default");

/**
 * Check string is have number
 * @param {String} str
 * @returns {true | false}
 */
const isStringNumber = (str) => (str ? /^[0-9]+$/.test(str) : false);

/**
 * Validate and format string query to match type
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function inputQueryGetAllMiddleware(ctx, next) {
  try {
    const { limit, sort, fields, page, offset } = ctx.request.query;
    const formatQuery = {};

    formatQuery.limit = isStringNumber(limit) ? parseInt(limit) : DEFAULT_LIMIT;
    formatQuery.page = isStringNumber(page) ? parseInt(page) : 0;
    formatQuery.offset = isStringNumber(offset)
      ? parseInt(offset)
      : formatQuery.limit * formatQuery.page;

    if ((sort === "desc") | (sort === "asc")) {
      formatQuery.sort = sort;
    }
    if (fields) {
      formatQuery.fields = fields.split(",");
    }

    ctx.request.formatQuery = formatQuery;

    return next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

module.exports = { inputQueryGetAllMiddleware };
