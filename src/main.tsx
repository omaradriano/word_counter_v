import { createRoot } from 'react-dom/client';

// Using react
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

// Custom css
import './styles/custom.css'

// Material icons
import 'material-icons/iconfont/material-icons.css';

import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<App/>)