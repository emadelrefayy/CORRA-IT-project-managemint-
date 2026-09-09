import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard, Projects, Assets, Network, Maintenance } from './pages';
import './index.css';
function App(){return <BrowserRouter><Layout><Routes><Route path="/" element={<Dashboard/>}/><Route path="/projects" element={<Projects/>}/><Route path="/assets" element={<Assets/>}/><Route path="/network" element={<Network/>}/><Route path="/maintenance" element={<Maintenance/>}/><Route path="*" element={<Dashboard/>}/></Routes></Layout></BrowserRouter>}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);