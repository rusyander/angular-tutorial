import { gql } from 'apollo-angular';

export const AllTodos = gql`
  query Todos($options: PageQueryOptions) {
    todos(options: $options) {
      data {
        id
        title
        completed
      }
    }
  }
`;

export const AddTodos = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      completed
    }
  }
`;

export const DeleteTodos = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const UpdateTodos = gql`
  mutation UpdateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      title
      completed
    }
  }
`;
