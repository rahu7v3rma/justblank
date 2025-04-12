export const getUserHomePath = (role: string) => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'seller':
      return '/seller';
    case 'customer':
      return '/';
    case 'superuser':
      return '/superuser';
    default:
      return '/';
  }
};
