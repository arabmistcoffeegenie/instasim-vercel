import fs from 'fs';
import path from 'path';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'data.txt');
  let content = '';

  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    content = 'No data yet.';
  }

  return {
    props: {
      content,
    },
  };
}

export default function ViewPage({ content }) {
  return (
    <div style={{
      backgroundColor: "#000",
      color: "#fff",
      padding: "20px",
      fontFamily: "monospace",
      whiteSpace: "pre-wrap",
      minHeight: "100vh", // ✅ Fix added here
      boxSizing: "border-box"
    }}>
      <h2>📄 data.txt contents</h2>
      <pre>{content}</pre>
    </div>
  );
}