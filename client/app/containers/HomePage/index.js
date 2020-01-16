/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, { useCallback, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';
import ApolloCacheUpdater from 'apollo-cache-updater';


export const TODO_MANY = gql`
  query {
    todoMany {
      _id
      title
      done
      isOptimistic @client
    }
  }
`;

const ADD_TODO = gql`
  mutation TodoCreateOne($input: CreateOneTodoInput!) {
    todoCreateOne(record: $input) {
      record {
        _id
        title
        done
      }
      recordId
    }
  }
`;



function HomePage() {
  const { loading, data: dataQuery } = useQuery(TODO_MANY, {
    fetchPolicy: 'cache-and-network',
  });
  const inputRef = useRef();
  const [addTodo] = useMutation(ADD_TODO);

  const onClick = useCallback(async () => {
    // Validation on Top

    const id = uuid();
    const title = inputRef.current.value || 'No Data';
    const done = false;

    inputRef.current.value = '';

    await addTodo({
      variables: {
        input: {
          title,
          done,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        todoCreateOne: {
          __typename: 'CreateOneTodoPayload',
          recordId: id,
          record: {
            __typename: 'Todo',
            _id: id,
            title,
            done,
            isOptimistic: true,
          },
        },
      },
      update: (cache, { data: { todoCreateOne } }) => {
        console.log('UPDATE TRIGGERED', todoCreateOne);


        const updates = ApolloCacheUpdater({
          proxy: cache,
          queriesToUpdate: [TODO_MANY],
          operation: {
            type: 'ADD',
            add: ({ query, type, data, variables }) => {
              console.log('Calling Add');
              const rec = todoCreateOne.record;
              return [rec, ...data];
            },
          },
          searchVariables: {},
          mutationResult: todoCreateOne,
          ID: 'recordId',
        });
        if (updates) console.log(`Success`);
       


        // This is Working fine
        // const queryData = cache.readQuery({ query: TODO_MANY });
        // cache.writeQuery({
        //   query: TODO_MANY,
        //   data: {
        //     todoMany: [
        //       {
        //         ...todoCreateOne.record,
        //       },
        //       ...queryData.todoMany,
        //     ],
        //   },
        // });
      },
    });
  }, []);

  

  console.log('ALL', dataQuery);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginTop: 50 }}>
        <input ref={inputRef} />
        <button type="button" onClick={onClick}>
          Add
        </button>
      </div>

      <h4>Todos</h4>
      {!loading &&
        !!dataQuery &&
        dataQuery.todoMany.length !== 0 &&
        dataQuery.todoMany.map((t, i) => (
          <div
            key={i}
            style={{ marginTop: 5, color: t.isOptimistic ? '#aaa' : '#000' }}
          >
            <span style={{ marginLeft: 10, marginRight: 10 }}>{t.title}</span>
          </div>
        ))}
    </div>
  );
}

export default HomePage;
