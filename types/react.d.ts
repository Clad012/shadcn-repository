import "react";

declare module "react" {
  // Add support for async server components
  export function createElement(
    type:
      | React.FC<any>
      | React.ComponentClass<any>
      | ((...args: any) => Promise<React.ReactNode>),
    props?: any,
    ...children: React.ReactNode[]
  ): React.ReactElement;
}
