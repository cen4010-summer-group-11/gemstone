export type ApiResponse = {
  ok: boolean;
  data: any;
};

type RespondParams = {
  data: any;
};

// helper function to shape response objects
export const respond = ({ data }: RespondParams): ApiResponse => {
  return { ok: true, data };
};

export const hasAllKeys = (arr: Array<any>, obj: object) => {
  return arr.every((field) => obj.hasOwnProperty(field));
};
