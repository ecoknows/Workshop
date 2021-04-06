import Axios from 'axios';

export const notify_someone = async (userData: any, data: any, socket: any) => {
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

    socket.emit('notification', {
      reciever_id: data.reciever_id,
    });
  } catch (error) {}
};
