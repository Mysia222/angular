const { errorType } = require('../constants');

export const handleFirestoreError = (error: any) => {
    console.error('Firestore Error:', error);

    const response = {
      error: true,
      message: 'An error occurred',
    };
  
    return response;
};
