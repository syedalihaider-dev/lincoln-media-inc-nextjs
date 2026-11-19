// Static HTML that the browser parses (and whose <script>s run) on first load. React renders it on the
// server and leaves it alone afterwards; `display: contents` keeps the wrapper out of the layout.
export default function RawHTML({ html }) {
  return <div style={{ display: "contents" }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
