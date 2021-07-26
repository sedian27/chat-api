const socket = require("../../socket").socket;
const store = require("./store");

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error("[messageController] No hay chat usuario o mensaje");
      reject("Los datos son icorrectos");
      return false;
    }

    let fileUrl = "";
    if (file) {
      fileUrl = `http://localhost:3000/app/files/${file.filename}`;
    }

    const fullMessage = {
      chat,
      user,
      message,
      date: new Date(),
      file: fileUrl,
    };

    store.addMessage(fullMessage);
    socket.io.emit("message", fullMessage);
    resolve(fullMessage);
  });
}

function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.listMessages(filterUser));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject("invalid data");
      return false;
    }
    const result = await store.updateMessage(id, message);
    resolve(result);
  });
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("Id invalido");
      return false;
    }

    store
      .removeMessage(id)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
