const {
  getList: getListTodos,
  getManyByIds: getManyByIdsTodos,
  createOne: createOneTodo,
  removeManyByIds: removeManyByIdsTodos,
  updateManyByIds: updateManyByIdsTodos,
} = require("../../database/todoRepository");

/**
 * Get todos from db
 * @param ctx
 * @returns {Promise<void>}
 */
async function getList(ctx) {
  try {
    const { limit, sort, fields, offset } = ctx.request.formatQuery;

    const todos = await getListTodos({
      limit,
      sort,
      fields,
      offset,
    });

    ctx.status = 200
    ctx.body = {
      data: todos,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

/**
 * Get todo by id
 * @param ctx
 * @returns {Promise<{data: todo}>}
 */
async function getOne(ctx) {
  try {
    const { id } = ctx.params;

    const existTodo = await getManyByIdsTodos([id]);
    if (!existTodo || existTodo.length === 0) {
      throw new Error(`Todos Not Found with id: ${id}`);
    }

    ctx.status = 200;
    return (ctx.body = {
      data: existTodo[0],
    });

  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 * Create a new todo
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function createOne(ctx) {
  try {
    const newData = ctx.request.body;

    await createOneTodo(newData)

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 * Update a todo
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function updateManyByIds(ctx) {
  try {
    const { data, ids } = ctx.request.body;

    const existTodos = await getManyByIdsTodos(ids);
    if (!existTodos || existTodos.length === 0) {
      throw new Error(`Todos Not Found with ids: ${JSON.stringify(ids)}`);
    }
    const existIds = existTodos.map(todo => todo.id);

    await updateManyByIdsTodos(existIds, data);

    ctx.status = 200;
    ctx.body = {
      success: true,
    };

  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 * Delete many todo by ids
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function removeManyByIds(ctx) {
  try {
    const { ids } = ctx.request.body;

    const existTodos = await getManyByIdsTodos(ids);
    if (!existTodos || existTodos.length === 0) {
      throw new Error(`Todos Not Found with that ids: ${JSON.stringify(ids)}`);
    }
    const existTodosIds = existTodos.map(todo => todo.id);

    await removeManyByIdsTodos(existTodosIds);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 * Update a todo
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function updateOne(ctx) {
  try {
    const postData = ctx.request.body;
    const { id } = ctx.params;

    const existTodo = await getManyByIdsTodos([id]);
    if (!existTodo || existTodo.length === 0) {
      throw new Error(`Todos Not Found with id: ${id}`);
    }

    await updateManyByIdsTodos([id], postData);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 * Delete a todo by id
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function removeOne(ctx) {
  try {
    const { id } = ctx.params;

    const existTodo = await getManyByIdsTodos([id]);
    if (!existTodo || existTodo.length === 0) {
      throw new Error(`Todo Not Found with id: ${id}`);
    }

    await removeManyByIdsTodos([id]);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getList,
  getOne,
  createOne,
  updateManyByIds,
  removeManyByIds,
  updateOne,
  removeOne,
};
