// eslint-disable
// this is an auto generated file. This will be overwritten

export const getHmjsChat = `query GetHmjsChat($id: ID!) {
  getHmjsChat(id: $id) {
    id
    user
    message
    created_at
  }
}
`;
export const listHmjsChats = `query ListHmjsChats(
  $filter: ModelHmjsChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listHmjsChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user
      message
      created_at
    }
    nextToken
  }
}
`;
