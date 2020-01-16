/* # ---------------------------------------------
# ---------------------------------------------
# Author: Richie Roldan
# Date:   Saturday January 11th 2020
# Last Modified by: Richie Roldan - <roldan.rv@achealth.com.ph>
# Last Modified time: January 11th 2020, 9:32:31 pm
# ---------------------------------------------
# --------------------------------------------- */


import { schemaComposer } from 'graphql-compose';
import {TodoQuery, TodoMutation} from './model/Todo'



schemaComposer.Query.addFields({
  ...TodoQuery
});
 
schemaComposer.Mutation.addFields({
 ...TodoMutation
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;