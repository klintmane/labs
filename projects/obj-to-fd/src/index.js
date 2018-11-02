function appendObjToFd(obj, fData, acc) {
  for (const key in obj) {
    const val = obj[key];
    const fKey = acc ? `${acc}[${key}]` : key;

    if (val !== undefined && val !== null) {
      switch (Object.prototype.toString.call(val)) {
        case "[object Object]":
          appendObjToFd(val, fData, fKey);
          break;
        case "[object Array]":
          val.forEach(el => fData.append(fKey + "[]", el));
          break;
        default:
          fData.append(fKey, val);
      }
    }
  }
}

function objToFd(obj, fData) {
  fData = fData || new FormData();
  appendObjToFd(obj, fData);
  return fData;
}

export default objToFd;
