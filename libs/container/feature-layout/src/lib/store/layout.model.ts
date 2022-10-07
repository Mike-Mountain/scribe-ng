export interface Layout {
  contentBottom: boolean;
  contentLeft: boolean;
  contentRight: boolean;
}

export function createLayout(params: Partial<Layout>): Layout {
  const layout: Layout = {
    contentRight: params.contentRight || false,
    contentLeft: params.contentLeft || false,
    contentBottom: params.contentBottom || false
  }
  return layout;
}
