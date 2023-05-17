export type TOneType = {
  kind: string;
  name: string;
  description: string;
  fields: Array<object> | null;
  inputFields: Array<object> | null;
};

export type TField = {
  name: string;
  type: {
    kind: string;
    name: string;
    ofType: {
      kind?: string;
      name?: string;
      ofType: {
        name?: string;
        ofType?: {
          name: string;
        };
      };
    };
  };
  args?: Array<TArg>;
};

export type TArgs = {
  args: {
    name: string;
    kind: string;
    ofType: { name: string };
  };
};

export type TArg = {
  name: string;
  type: {
    name: string;
    kind: string;
    ofType: {
      name: string;
    };
  };
};
