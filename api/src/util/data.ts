export type ApiResponse = {
  ok: boolean;
  data: any;
};

// helper function to shape response objects
export const respond = (data: any): ApiResponse => {
  return { ok: true, data };
};
