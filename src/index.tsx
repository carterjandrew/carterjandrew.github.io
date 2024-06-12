import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import AssetContext, { genAssetObject } from './assetContext';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './layouts/root';
import MarkdownRenderer from './components/content';

import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const resumePDF = () => {
  return (
    <Document file='/resume.pdf'>
      <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false}  />
      <Page pageNumber={2} renderTextLayer={false} renderAnnotationLayer={false} />
    </Document>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<MarkdownRenderer />} />
      <Route path='resume' element={resumePDF()} />
      <Route path=':sectionName' element={<MarkdownRenderer />} />
      <Route path=':sectionName/:topicName' element={<MarkdownRenderer />} />
    </Route>
  ), { basename: process.env.PUBLIC_URL }
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AssetContext.Provider value={genAssetObject()}>
      <RouterProvider router={router} />
    </AssetContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
