// preload.js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('secureAPI', {
  // يمكنك إضافة الوظائف التي تريد أن تكون متاحة هنا
});