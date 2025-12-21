interface Params {
  params: Promise<any>;
}

export default async function DetailsPage({ params }: Params) {
  const { slug } = await params;
  return (<div>{slug}</div>);
}
