const { DEFAULT_LIMIT } = require("../const/default");
const db = require("../config/firestore");
const firestore = require("firebase-admin/firestore")
const todosRef = db.collection("todos");


/**
 * Get result from snapshots
 * @param {*} snapshot 
 */
function prepareDoc(doc) {
  return {
    ...doc.data(),
    id: doc.id
  }
}

/**
 * Get all todos by filter
 * @param {Number} limit
 * @param {"desc" | "asc"} sort
 * @param {Array<string>} fields
 * @returns {Promise<Array<Todo>>}
 */
async function getList({ fields, offset = 0, limit = DEFAULT_LIMIT, sort = "desc" }) {
  let query = todosRef
    .offset(offset)
    .limit(limit)
    .orderBy('createdAt', sort)
  if (fields && fields.length > 0) {
    query = query.select(...fields);
  }

  const snapshot = await query.get();

  return snapshot.docs.map(doc => prepareDoc(doc));
}

/**
 * Get many by ids
 * @param {*} ids
 * @returns {Promise<Array<Todo>>}
 */
async function getManyByIds(ids) {
  const snapshot = await todosRef
    .where(firestore.FieldPath.documentId(), 'in', ids)
    .get();

  return snapshot.docs.map(doc => prepareDoc(doc));
}

/**
 * Count all 
 * @returns {Promise<Number>}
 */
async function countAll() {
  const countDoc = await todosRef.count().get();

  return countDoc.data().count
}

/**
 * Add new todo
 * @param {Todo} data
 * @returns {Promise<Result>}
 */
async function createOne(data) {
  const newData = {
    ...data,
    createdAt: new Date(),
    isCompleted: false
  }

  return await todosRef.add(newData);
}

/**
 * Update many todos
 * @param {Array} ids
 * @param {Todo} data with several fields
 * @returns
 */
async function updateManyByIds(ids, data) {
  const jobs = ids.map(id => {
    return todosRef.doc(id).update(data)
  })
  return await Promise.all(jobs)
}

/**
 * Delete many of todos by ids
 * @param {*} id
 * @returns
 */
async function removeManyByIds(ids) {
  const jobs = ids.map(id => {
    return todosRef.doc(id).delete()
  })
  return await Promise.all(jobs)
}


module.exports = {
  getList,
  getManyByIds,
  countAll,
  createOne,
  removeManyByIds,
  updateManyByIds,
};
