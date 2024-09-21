export type ActionReturnType<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      message: string;
      field: string;
      // TODO decide which one to use message or key
      // key?: string;
    };
