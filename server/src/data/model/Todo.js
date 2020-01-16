/* # ---------------------------------------------
# ---------------------------------------------
# Author: Richie Roldan
# Date:   Saturday January 11th 2020
# Last Modified by: Richie Roldan - <roldan.rv@achealth.com.ph>
# Last Modified time: January 12th 2020, 11:32:32 pm
# ---------------------------------------------
# --------------------------------------------- */

import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose';

const TodoSchema = new mongoose.Schema({
  title: String, // standard types
  done: Boolean, // standard types
});


const Todo = mongoose.model('Todo', TodoSchema);

const customizationOptions = {}; // left it empty for simplicity, described below

export const TodoTC = composeWithMongoose(Todo, customizationOptions);

export const TodoQuery = {
  todoById: TodoTC.getResolver('findById'),
  todoByIds: TodoTC.getResolver('findByIds'),
  todoOne: TodoTC.getResolver('findOne'),
  todoMany: TodoTC.getResolver('findMany'),
  todoCount: TodoTC.getResolver('count'),
  todoConnection: TodoTC.getResolver('connection'),
  todoPagination: TodoTC.getResolver('pagination'),

}

export const TodoMutation = {
  todoCreateOne: TodoTC.getResolver('createOne'),
  todoUpdateById: TodoTC.getResolver('updateById'),
  todoUpdateOne: TodoTC.getResolver('updateOne'),
  todoRemoveById: TodoTC.getResolver('removeById'),
  todoRemoveOne: TodoTC.getResolver('removeOne'),
  todoRemoveMany: TodoTC.getResolver('removeMany'),
}
export default Todo
