/**
  * Show Error
  */
export default function (dispatch, type, val) {
  return new Promise((resolve, reject) => {
    // Validate types
    const allowed = ['error', 'success', 'info', 'loading'];
    if (!allowed.includes(type)) {
      return reject('Type should be one of success, error or info');
    }

    // Set some defaults for convenience
    let message = val;
    if (!val) {
      if (type === 'success') message = 'Sukces';
      if (type === 'error') message = 'Wystąpił problem';
      if (type === 'info') message = 'Coś się dzieje...';
      if (type === 'loading' && val !== false) message = true;
    }

    return resolve(dispatch({
      type: 'STATUS_REPLACE',
      [type]: message,
    }));
  });
}
