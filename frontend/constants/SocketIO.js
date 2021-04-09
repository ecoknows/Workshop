import io from 'socket.io-client';
import async from 'async';
import {local_url} from './urls';

export default class SocketInstance {
  static instance = null;
  static socketConn = null;
  static online = false;

  static getInstance() {
    if (SocketInstance.instance === null) {
      SocketInstance.instance = new SocketInstance();
      SocketInstance.getSocket();
    }
    return this.instance;
  }

  static getSocket() {
    if (SocketInstance.socketConn === null) {
      SocketInstance.socketConn = io.connect(local_url, {
        query: {roomId: '1234'},
      });

      //   SocketInstance.socketConn.on('connect', () => {
      //     console.warn('socket running in shared instance');
      //     SocketInstance.socketConn.emit('*', handshake);
      //     SocketInstance.online = true;
      //   });
      //   SocketInstance.socketConn.on('disconnect', () => {
      //     console.warn('--socket disconnected in shared instance--');
      //     SocketInstance.online = false;
      //   });
    }
    return this.socketConn;
  }

  send(message, data) {
    if (SocketInstance.socketConn !== null) {
      SocketInstance.socketConn.emit(message, data);
    } else {
      SocketInstance.getSocket();
    }
  }

  listen(message, func) {
    if (SocketInstance.socketConn !== null) {
      SocketInstance.socketConn.on(message, data => {
        func(data);
      });
    } else {
      SocketInstance.getSocket();
    }
  }

  //   isOnline() {
  //     if (SocketInstance.socketConn !== null) {
  //       if (SocketInstance.socketConn.connected === false) {
  //         SocketInstance.getSocket();
  //       }
  //       return SocketInstance.socketConn.connected;
  //     } else {
  //       SocketInstance.getSocket();
  //       return false;
  //     }
  //   }
}
