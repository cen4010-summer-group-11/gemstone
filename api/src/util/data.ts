export type ApiResponse = {
  ok: boolean;
  data: any;
};

type RespondParams = {
  data: any
}

// helper function to shape response objects
export const respond = ({ data }: RespondParams): ApiResponse => {
  return { ok: true, data };
};
