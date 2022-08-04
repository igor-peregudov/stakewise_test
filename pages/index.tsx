import MainPage, { HomePageProps } from '../containers/MainPage';
import { gql } from '@apollo/client';
import client from '../apollo-client';

const Home = (props: HomePageProps) => <MainPage {...props} />;
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        buddies {
          id
          name
          image
        }
      }
    `,
  });

  return {
    props: {
      buddies: data.buddies,
    },
  };
}
export default Home;
