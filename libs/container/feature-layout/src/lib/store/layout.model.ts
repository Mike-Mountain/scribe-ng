export interface Layout {
  contentBottom: string;
  contentLeft: string;
  contentRight: string;
}

export function createLayout(params: Partial<Layout>): Layout {
  const layout: Layout = {
    contentRight: params.contentRight || 'closed',
    contentLeft: params.contentLeft || 'closed',
    contentBottom: params.contentBottom || 'closed'
  }
  return layout;
}
