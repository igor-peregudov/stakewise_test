import UserPage, { UserPageProps } from '../../containers/UserPage';
import { gql } from '@apollo/client';
import client from '../../apollo-client';

const User = (props: UserPageProps) => <UserPage {...props} />;
export async function getServerSideProps(props: { params: { id: string } }) {
  const { data } = await client.query({
    query: gql`
      query Buddy($where: BuddyWhereUniqueInput!) {
        buddy(where: $where) {
          name
          image
          id
        }
      }
    `,
    variables: { where: { id: props.params.id } },
  });

  return {
    props: {
      buddy: data.buddy,
    },
  };
}
export default User;
