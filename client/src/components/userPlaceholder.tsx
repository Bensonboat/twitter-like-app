import { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../axios/api";

const UserPlaceholder = ({ setUserData, userData }: any) => {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await API.getUser(id!);
        setUserData(userProfile.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  return <div>{userData?.username}</div>;
};

export default UserPlaceholder;
