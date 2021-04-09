import Axios from 'axios';
import SocketInstance from './SocketIO';

export const notify_someone = async (userData: any, data: any) => {
  try {
    await Axios.post(
      '/notification/send',
      {
        ...data,
      },
      {
        headers: {Authorization: `Bearer ${userData.token}`},
      },
    );

    const socket = SocketInstance.getInstance();

    socket.send('notification', {
      reciever_id: data.reciever_id,
    });
  } catch (error) {}
};
