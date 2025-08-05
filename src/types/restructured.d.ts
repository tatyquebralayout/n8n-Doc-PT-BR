declare module 'restructured' {
  interface RSTNode {
    type: string;
    children?: RSTNode[];
    [key: string]: any;
  }

  interface RSTOptions {
    [key: string]: any;
  }

  function parse(rst: string, options?: RSTOptions): RSTNode;
  
  export = parse;
} 