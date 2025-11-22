// 标准成功返回
export function success(result = null, message = "success") {
  return {
    status: 200,
    message,
    result,
    time: Date.now(),
  };
}

// 标准失败返回
export function fail(message = "error", status = 500, result = null) {
  return {
    status,
    message,
    result,
    time: Date.now(),
  };
}
export function throwError(message = "Server Error", status = 500) {
  const err = new Error(message);
  err.status = status;
  throw err;
}
