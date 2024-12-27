export default async function Home() {
  if (process.env.BACKEND_URL === undefined) return null;

  // backendと疎通するサンプル
  console.log(process.env.BACKEND_URL);
  const response = await fetch(process.env.BACKEND_URL);
  const text = (await response.text()).toString();

  return <div className="p-5">{text}</div>;
}
