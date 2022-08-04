import UserInfo, { User } from '../../components/UserInfo';

export type UserPageProps = {
  buddy: User;
};

const UserPage = (props: UserPageProps) => {
  const { buddy } = props;
  return <UserInfo user={buddy} />;
};

export default UserPage;
